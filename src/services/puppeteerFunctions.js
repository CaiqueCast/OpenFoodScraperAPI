const puppeteer = require("puppeteer");
const errorRes = require("../utils/responses/errorResponse");

const dataElement = async (page, value, textToRemove) => {
  try {
    return await page.$eval(
      value,
      (element, textToRemove) => {
        return element.innerText.replace(textToRemove, "");
      },
      textToRemove
    );
  } catch (error) {
    return "Unknown";
  }
};

const scrapeDataByRank = async (res, url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.$$eval(".list_product_a", (el) =>
      el.map((link) => link.href)
    );

    let response = [];

    for (link of links) {
      const newPage = await browser.newPage();
      await newPage.goto(link);

      const title = await dataElement(newPage, ".title-1");
      const id = await dataElement(
        newPage,
        'span[property="food:code"][itemprop="gtin13"]'
      );
      const nutritionScore = await dataElement(
        newPage,
        'a[href="#panel_nutriscore"] .attr_text h4',
        "Nutri-Score "
      );
      const nutritionTitle = await dataElement(
        newPage,
        'a[href="#panel_nutriscore"] .attr_text span'
      );
      const novaScore = await dataElement(
        newPage,
        'a[href="#panel_nova"] .attr_text h4',
        "NOVA "
      );
      const novaTitle = await dataElement(
        newPage,
        'a[href="#panel_nova"] .attr_text span'
      );

      response.push({
        id,
        name: title,
        nutrition: {
          score: nutritionScore,
          title: nutritionTitle,
        },
        nova: {
          score: novaScore,
          title: novaTitle,
        },
      });

      await newPage.close();
    }

    await browser.close();
    return response;
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const scrapeDataById = async (res, url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const title = await dataElement(page, ".title-1");

    const nutritionScore = await dataElement(
      page,
      'a[href="#panel_nutriscore"] .attr_text h4',
      "Nutri-Score "
    );
    const nutritionTitle = await dataElement(
      page,
      'a[href="#panel_nutriscore"] .attr_text span'
    );
    const novaScore = await dataElement(
      page,
      'a[href="#panel_nova"] .attr_text h4',
      "NOVA "
    );
    const novaTitle = await dataElement(
      page,
      'a[href="#panel_nova"] .attr_text span'
    );
    const quantity = await dataElement(page, "#field_quantity .field_value");

    let elementHasPalmOil = await page.$(
      'a[href="#panel_ingredients_analysis_en-palm-oil-content-unknown_content"] h4.evaluation_unknown_title'
    );

    if (!elementHasPalmOil) {
      elementHasPalmOil = await page.$(
        'a[href="#panel_ingredients_analysis_en-palm-oil-free_content"] h4.evaluation_good_title'
      );
    }
    let hasPalmOil;

    if (elementHasPalmOil) {
      hasPalmOil = await page.evaluate(
        (element) => element.innerText,
        elementHasPalmOil
      );
    } else {
      hasPalmOil = "unknown";
    }

    let elementIsVegan = await page.$(
      'a[href="#panel_ingredients_analysis_en-non-vegan_content"] h4.evaluation_bad_title'
    );

    if (!elementIsVegan) {
      elementIsVegan = await page.$(
        'a[href="#panel_ingredients_analysis_en-vegan_content"] h4.evaluation_good_title'
      );
    }

    let isVegan;

    if (elementIsVegan) {
      isVegan = await page.evaluate(
        (element) => element.innerText,
        elementIsVegan
      );
    } else {
      isVegan = "unknown";
    }

    let elementIsVegetarian = await page.$(
      'a[href="#panel_ingredients_analysis_en-non-vegetarian_content"] h4.evaluation_bad_title'
    );

    if (!elementIsVegetarian) {
      elementIsVegetarian = await page.$(
        'a[href="#panel_ingredients_analysis_en-vegetarian_content"] h4.evaluation_good_title'
      );
    }
    let isVegetarian;

    if (elementIsVegetarian) {
      isVegetarian = await page.evaluate(
        (element) => element.innerText,
        elementIsVegetarian
      );
    } else {
      isVegetarian = "unknown";
    }

    let list = [];
    let ingredients;
    let elementIngredients = await page.$(
      "#panel_ingredients_content .panel_text"
    );

    if (elementIngredients) {
      ingredients = await dataElement(
        page,
        "#panel_ingredients_content .panel_text"
      );
    } else {
      ingredients = "unknown";
    }

    list.push(ingredients.replace(/"/g, "'"));

    let values = [];

    const values1 = await dataElement(
      page,
      "#panel_nutrient_level_fat .evaluation__title"
    );
    const values2 = await dataElement(
      page,
      "#panel_nutrient_level_saturated-fat .evaluation__title"
    );
    const values3 = await dataElement(
      page,
      "#panel_nutrient_level_sugars .evaluation__title"
    );
    const values4 = await dataElement(
      page,
      "#panel_nutrient_level_salt .evaluation__title"
    );
    const nutritionValues = [values1, values2, values3, values4];

    for (let i = 0; i < nutritionValues.length; i++) {
      let level;
      if (nutritionValues[i].includes("baixa")) {
        level = "low";
      } else if (nutritionValues[i].includes("moderada")) {
        level = "moderate";
      } else if (nutritionValues[i].includes("elevada")) {
        level = "high";
      }

      values.push([level, nutritionValues[i]]);
    }

    let elementServingSize = await page.$(
      "#panel_serving_size_content .panel_text"
    );

    let servingSize;

    if (elementServingSize) {
      servingSize = await page.evaluate(
        (element) => element.innerText,
        elementServingSize
      );
    } else {
      servingSize = "unknown";
    }

    const nutritionalData = await page.evaluate(() => {
      const dataRows = Array.from(
        document.querySelectorAll(
          'table[aria-label="Dados nutricionais"] tbody tr'
        )
      );

      const nutritionalInfo = {};

      dataRows.forEach((row) => {
        const columns = row.querySelectorAll("td");
        const nutrientName = columns[0].innerText
          .replace("/", "e")
          .replace(/\s+/g, "")
          .trim();
        const per100g = columns[1].innerText.trim();
        let perServing;
        if (columns[2] && !columns[2].innerText.includes("%")) {
          perServing = columns[2].innerText.trim();
        }

        nutritionalInfo[nutrientName] = {
          per100g,
          perServing,
        };
      });
      return nutritionalInfo;
    });

    const response = {
      name: title,
      quantity,
      ingredients: {
        hasPalmOil,
        isVegan,
        isVegetarian,
        list,
      },
      nutrition: {
        score: nutritionScore,
        title: nutritionTitle,
        values,
        servingSize,
        data: {
          Energia: nutritionalData.Energia,
          "Gorduras/lípidos": nutritionalData.Gorduraselípidos,
          Carboidratos: nutritionalData.Carboidratos,
          "Fibra alimentar": nutritionalData.Fibraalimentar,
          Proteínas: nutritionalData.Proteínas,
          Sal: nutritionalData.Sal,
        },
      },
      nova: {
        score: novaScore,
        title: novaTitle,
      },
    };
    await browser.close();
    return response;
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = { scrapeDataByRank, scrapeDataById };

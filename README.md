# IDassignment2
Name:Mahshukurrahman StudentID:S10204884H  Class:IT03

# Description and Purpose
> This API allows users to search for nutrition and diet data for generic foods,packed foods and restaurant dishes. This API has a Natural 
> Language Processing (NLP) feature which extracts food entities from unstructured text within search queries.
## IDEA: Food and Nutrition
> As a developed country,Singapore has many available food resources. There is a wide variety of foods for people to choose. But little do they
> know what those foods a made up of(i.e Nutrients and dietary.) 
> Hence,this website can allow users to search for food ingredients and see nutritional data, in order to better plan their meals and watch their
> diets. This API also helps users who are trying to combat obesity-related issues.
# About my APIs
[Edamam Food and Grocery Database](https://rapidapi.com/edamam/api/edamam-food-and-grocery-database/endpoints)
[API documentation](https://rapidapi.com/edamam/api/edamam-food-and-grocery-database/details)

[YouTube Data API v3](https://developers.google.com/youtube/v3?__hstc=20629287.d8ed774c1cd02ed3bbe5e8c277a9f9fd.1608540177401.1608540177401.1608540177401.1&__hssc=20629287.1.1608540177402&__hsfp=563081268)
# Header
Name of Website:StayHealthy Nutrition
## Primary Search Box
After Description page

# Features
1. Brand Logo at Navigation bar('StayHealthy Icon)
2. ## Navigation
  [x] Home(Search Landing Page)
  [x] Nutrition
  [x]-Videos
  [] Article(Disabled)
3. Collapsible Hamburger Navigation Menu
4. Site Description

5. ## Search Engine 
  [x] Allow users to search any dish(e.g. Chicken Rice) or even supermarket groceries (e.g. Milo packet)
6. Nutrition Breakdown
   ## Table
   Nutrient | Amount(kcal)
   ---------|-------------
   Protein  | xxx
   Fibre    | xxx
  ## List 
  * Ingredient/FoodContent 1
  * Ingredient/FoodContent 2
  * Ingredient/FoodContent 3
  * Ingredient/FoodContent 4

7. ## Animations
* Inspired by : https://graygrids.com/templates/free-bootstrap-5-template-simple/ 
*  [Pure CSS FadeIn FadeOut Animation - CSS Property #01](https://www.youtube.com/watch?v=tbqyCwoH_-k)
* Applied to search Results,Navbar,Headings etc.
8. ## FoodContentsDisplay
* Display the food contents (of a dish selection only) in a list form.
9. ## User input validation
* Display 'successful search' message and error message for valid and invalid inputs respectively.
## Potential / Missed Out Features(Due to constraints)
* Natural Processing Language(Feature that will not be implemented)
* YouTube Data v3 API:Display videos based on User search 
* AutoComplete in a Searchbox :Make it easier for users to enter intended Food
* Alerts for user Input validations 
* Articles' section --> Display user-interested nutritional articles up to date

 # Technologies Used
 * Adobe XD (Medium-Fidelity Wireframe)
 * Adobe Illustrator (StayHealthy Icon) [StayHealthy Icon](images/Icon-image-design .svg)
 * VS Code (Source Codes)
 * [JQuery](https://code.jquery.com/jquery-3.5.1.min.js)
 * [BootStrap](https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css)
 * [Bootstrap source codes & CDN](getbootstrap.com/docs)
 *  [JavaScript] JavaScript
 * Animate.css
 * HTML,CSS
* SCSS to CSS converter & Codepen.io: For background vector CSS drops design
* Microsoft Excel : Manual Testing Documentation
* code Validators: JSHint,W3C,W3C CSS
## Design Choices
* [Background Image](images/search-background.jpg)
* 'StayHealthy' Icon:Used triadic colors (Red,yellow and purple)
* Fonts:Nunito,weight 300(default):Classy font,easy to read in large text chunks
* Background CSS : White background for brightness,yellow and cyanish drops pattern was created to draw attention to site users 
* Healthy Dish Image on index Homepage: To illustrate the aim of this website -->Promote food nutrition
* Features Icon and Heading : Red color to create emphasis of interactive features of the site
* Search Landing Peas Image: To create a homely feeling
* Black text box and Orange-colored text input:To create contrast 
* Red-colored bottom Footer with social icons
* Social Icons in plain white with slight darkening when hovered over to easily distinguish
* StayHealthy Logo icon,background,fontAwesome logos in vector format:clear high-quality across browsers and screen sizes.
* Italicised Block quote to create credibility of website 
* ### Cards layout 
  * Cards display avaiable food results: easy to Read and choose
  * Dark blue headings,green highlights on hover: contrasting colour distinguish hovered element
  * Dark-themed table with white-colored text: Distinctive element to stand out from regular black color text  

# Testing 
## Automated Testing
[x]W3C MarkUp HTML Validation
[x]W3 CSS Validation
[x] W3C Link Validation
## Manual Testing
[Manual Testing Excel Spreadsheet](S10204884H_IDAssg02ManualTestingDocumentation.xlsx)


# Bugs and glitches
* Nutrition table in 'Nutritions' page (cells should be displayed top to bottom)
* Bootstrap template main.js line 70 ,100 and 109
* Bootstrap template glide.min.js line 6
* YouTube CORS issues
* Some food images not found (not uploaded on API host server)
* Mobile Chrome scroll lag
* _FIXED_ website pitch recording
* [Video Recording](3AF091DC-27CF-4EA2-8690-92A38CB8CECE-.mp4)
* _FIXED_ nutritonscript.js loading in nutrition.html
# Credits

* ## Template Info
[Bootstrap 5 Template](https://graygrids.com/templates/free-bootstrap-5-template-simple/)
* ## Code
Javascript url parameters :https://usefulangle.com/post/81/javascript-change-url-parameters
Javascript url parameters :https://www.sitepoint.com/get-url-parameters-with-javascript/
* ## Text Content
Blockquote in page 1 header:https://healthyeating.sfgate.com/nutrition-affect-exercise-6391.html
* ## Website Animation
 * [Animation Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

* ## Images
    ### Background Header Image
    [My Fitness Pal](https://blog.myfitnesspal.com/essential-guide-to-healthy-eating/)
    ["Nutrition • Vegetables • Peas" by Living Fitness UK is licensed with CC BY-NC-ND 2.0.](https://creativecommons.org/licenses/by-nc-nd/2.0/)
    ### StayHealthy ICON(brand)
    ![Photo by Anton Anton on dreamstime · · · Vector Image Of Painted Vegetables On A White Background. Graphic Seamless Pattern. Stock Illustration Illustration of illustration, organic: 131240058](https://www.pinterest.com/pin/510736413995726959/)
    !["StayHealthy icon"]("Icon-image-design copy.svg")
    ### Background page
    Inspired by,Designer:Yoksel Oeksea
    * [SCSS Background Design Inspiration](https://codepen.io/yoksel/pen/oeksa)
* ## Icons
For youtube,utensils,fruit icons at page 1: https://fontawesome.com/
* ## Fonts
  Google Fonts : [Font Source Code](https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap)
# Acknowledgements
1. W3Schools.com : Helped with many coding structures 
2. Mr Andy Ng : Helped with many website issues ( Thank you cher:) )
3. api.jquery.com : jquery AJAX
4. getbootstrap.com : bootstrap Layout
5. YouTube videos
6. FreeCodeCamp.com :Positioning tutorials

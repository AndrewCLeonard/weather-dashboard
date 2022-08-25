# weather-dashboard

Demonstration of ability to use server-side APIs

## User Story

|         |                                                |
| ------- | ---------------------------------------------- |
| AS A    | traveler                                       |
| I WANT  | to see the weather outlook for multiple cities |
| SO THAT | I can plan a trip accordingly                  |

## Acceptance Criteria

**GIVEN a weather dashboard with form inputs...**

| WHEN I...                                     | THEN I am presented with...                                                                                                                                                                         |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| search for a city                             | current and future conditions for that city and that city is added to the search history                                                                                                            |
| view current weather conditions for that city | <ul><li>the city name, <li>the date,</li><li>an icon representation of weather conditions,</li> <li>the temperature,</li> <li>the humidity,</li> <li>the wind speed,</li> <li>and the UV index</li> |
| view the UV index                             | a color that indicates whether the conditions are favorable, moderate, or severe                                                                                                                    |
| view future weather conditions for that city  | <ul><li>a 5-day forecast that displays the date,</li> <li>an icon representation of weather conditions,</li> <li>the temperature,</li> <li>the wind speed,</li> <li>and the humidity</li></ul>      |
| click on a city in the search history         | presented with current and future conditions for that city                                                                                                                                          |

## Mockup

![mockup image](./assets/mockup.png "Bootstrapilicious!")

## Explanation

| Dependency                                                                   | Type | Explanation                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenWeatherMap Geocoding API](https://openweathermap.org/api/geocoding-api) | API  | Need to convert city names to geographical coordinates of latitude and longitude. <br> <br> Given a search for "London"<ol><li>finds cities named "London" around the world</li><li>Presents user with buttons of the different countries to click</li><li>when one is selected, the weather appears</li></ol> |

## Dependencies

## Backlog

### High Priority

-   I'm running code in browser, so I can't use dotenv package. How to hide my API Key in this case?

### Medium Priority

-   The header's image is responsive, but it changes because of `object-fit` when resized.
-   Improve the fit of five-day forecast cards

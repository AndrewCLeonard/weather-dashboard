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

## Backlog

-   The header's image is responsive, but it changes because of `object-fit` when resized.
## Continuous Integration Status

[![Compile](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/compile.yml/badge.svg)](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/compile.yml)
[![Format](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/format.yml/badge.svg)](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/format.yml)
[![Lint](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/lint.yml/badge.svg)](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/lint.yml)
[![Test](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/test.yml/badge.svg)](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/test.yml)

## Continuous Deployment

[![Build and deploy Node.js app to Azure Web App - bathroom-finder](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/main_bathroom-finder.yml/badge.svg)](https://github.com/Green-Kittens/bathroom-finder-backend/actions/workflows/main_bathroom-finder.yml)

https://bathroom-finder.azurewebsites.net/

## Coverage Report

2024-06-07 (still in PR)

| File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s             |
| ---------------------- | ------- | -------- | ------- | ------- | ----------------------------- |
| All files              | 73.05   | 65.62    | 80.55   | 73.36   |
| src                    | 78.26   | 33.33    | 66.66   | 77.27   |
| config.ts              | 100     | 50       | 100     | 100     | 5-6                           |
| database.ts            | 62.5    | 0        | 100     | 57.14   | 8-15                          |
| index.ts               | 84.61   | 0        | 0       | 84.61   | 35-36                         |
| src/controllers        | 66.66   | 68.18    | 80      | 67.17   |
| facility.controller.ts | 67.34   | 64.28    | 80      | 68.75   | 9-14,33,48-51,65-68,73,94,102 |
| images.controller.ts   | 9.52    | 0        | 0       | 10      | 9-37                          |
| review.controller.ts   | 78.37   | 100      | 80      | 78.12   | 17-21,34,50,63                |
| user.controller.ts     | 90.32   | 100      | 100     | 90.32   | 32,56,73                      |
| src/middleware         | 88.88   | 100      | 100     | 87.5    |
| error.handler.ts       | 88.88   | 100      | 100     | 87.5    | 17                            |
| src/models             | 100     | 100      | 100     | 100     |
| facility.model.ts      | 100     | 100      | 100     | 100     |
| review.model.ts        | 100     | 100      | 100     | 100     |
| user.model.ts          | 100     | 100      | 100     | 100     |
| src/routes             | 100     | 100      | 100     | 100     |
| facility.routes.ts     | 100     | 100      | 100     | 100     |
| images.routes.ts       | 100     | 100      | 100     | 100     |
| review.routes.ts       | 100     | 100      | 100     | 100     |
| user.routes.ts         | 100     | 100      | 100     | 100     |

Test Suites: 6 passed, 6 total
Tests: 26 passed, 26 total
Snapshots: 0 total
Time: 15.644 s

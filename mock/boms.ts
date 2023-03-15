import { BomsApi } from '../src/api/api'
export default [
  {
    url: `${BomsApi}/status/pass`,
    method: 'get',
    response: () => {
      return {
        bomsList: [
          {
            _id: '64099084eec7cd29281f7b86',
            status: 'pass',
            correlation: false,
            igxlVer: '10.20.01',
            smartestVer: '',
            bomchange: [],
            bomVer: 'v2',
            createdBy: [
              {
                user: '95796',
                status: 'Newbom',
                message: 'new bom',
                date: new Date('2023-03-09T07:53:40.129Z')
              },
              {
                user: '95796',
                status: 'Renewbom',
                message: 'renew bom from new to new ',
                date: new Date('2023-03-09T08:25:07.694Z')
              }
            ],
            updatedBy: [
              {
                user: '101557',
                status: 'Update',
                message: 'first upload',
                date: new Date('2023-03-09T09:48:15.104Z')
              }
            ],
            buyoffBy: [
              {
                user: '101557',
                status: 'Bombuyoff',
                message: 'buyoff success',
                date: new Date('2023-03-09T09:48:15.104Z')
              }
            ],
            platform: 'UFLEX',
            program: 'WS8U-PG660-12B-15',
            version: '15',
            device: 'WP90-PG660-57B',
            step: 'CP1',
            sitemap: '8',
            bomNo: 'PRS-888888888',
            owner: '95796',
            customer: '0000453',
            productionline: 'Probe',
            plant: 'T6',
            lotType: 'ProductionLot',
            targetDevice: 'WP90-PG660-57B',
            source: 'WB90-PG660-57B',
            family: 'BEAMER2.0',
            stage: 'CP',
            bomMd5: '657b6190e1daf39e4ccae1f4ec4d8c92',
            createdAt: new Date('2023-03-09T07:53:40.140Z'),
            updatedAt: new Date('2023-03-09T09:48:15.105Z'),
            code: {},
            msPath: '/CP/UFLEX/0000453/ae11257af824e1a3e75e5ffe600aa22c',
            userProgram: 'justin-test123.gz',
            userProgramMd5: 'ae11257af824e1a3e75e5ffe600aa22c'
          }
        ]
      }
    }
  },
  {
    url: `${BomsApi}/status/waiting`,
    method: 'get',
    response: () => {
      return {
        bomsList: [
          {
            _id: '64099084eec7cd29281f7b87',
            status: 'waiting',
            correlation: false,
            igxlVer: '10.20.01',
            smartestVer: '',
            bomchange: [],
            bomVer: 'v2',
            createdBy: [
              {
                user: '95796',
                status: 'Newbom',
                message: 'new bom',
                date: new Date('2023-03-09T07:53:40.130Z')
              },
              {
                user: '95796',
                status: 'Renewbom',
                message: 'renew bom from pass to waiting ',
                date: new Date('2023-03-09T08:25:07.696Z')
              }
            ],
            updatedBy: [
              {
                user: '101557',
                status: 'Update',
                message: 'first upload',
                date: new Date('2023-03-09T08:07:16.254Z')
              }
            ],
            buyoffBy: [
              {
                user: 'user',
                status: 'Bombuyoff',
                message: 'buyoff success',
                date: new Date('2023-03-09T08:15:39.098Z')
              }
            ],
            platform: 'UFLEX',
            program: 'WS2U-PG660-12B-16_MX21',
            version: '16',
            device: 'WP90-PG660-57B',
            step: 'CP2',
            sitemap: '2',
            bomNo: 'PRS-888888888',
            owner: '95796',
            customer: '0000453',
            productionline: 'Probe',
            plant: 'T6',
            lotType: 'ProductionLot',
            targetDevice: 'WP90-PG660-57B',
            source: 'WB90-PG660-57B',
            family: 'BEAMER2.0',
            stage: 'CP',
            bomMd5: '0c774eab30a105eb5c166e353d8470ee',
            createdAt: new Date('2023-03-09T07:53:40.150Z'),
            updatedAt: new Date('2023-03-09T08:25:07.704Z'),
            code: '64001c22c3d8781a7cb12bab',
            msPath: '/CP/UFLEX/0000453/ae11257af824e1a3e75e5ffe600aa22c',
            userProgram: 'justin-test123.gz',
            userProgramMd5: 'ae11257af824e1a3e75e5ffe600aa22c'
          }
        ]
      }
    }
  },
  {
    url: `${BomsApi}/status/cancel`,
    method: 'get',
    response: () => {
      return {
        bomsList: []
      }
    }
  },
  {
    url: `${BomsApi}/status/new`,
    method: 'get',
    response: () => {
      return {
        bomsList: [
          {
            _id: '64099084eec7cd29281f7b87',
            status: 'new',
            correlation: false,
            igxlVer: '10.20.01',
            smartestVer: '',
            bomchange: [],
            bomVer: 'v2',
            createdBy: [
              {
                user: '95796',
                status: 'Newbom',
                message: 'new bom',
                date: new Date('2023-03-09T07:53:40.130Z')
              },
              {
                user: '95796',
                status: 'Renewbom',
                message: 'renew bom from pass to waiting ',
                date: new Date('2023-03-09T08:25:07.696Z')
              }
            ],
            updatedBy: [],
            buyoffBy: [],
            platform: 'UFLEX',
            program: 'WS2U-PG660-12B-16_MX21',
            version: '16',
            device: 'WP90-PG660-57B',
            step: 'CP2',
            sitemap: '2',
            bomNo: 'PRS-888888888',
            owner: '95796',
            customer: '0000453',
            productionline: 'Probe',
            plant: 'T6',
            lotType: 'ProductionLot',
            targetDevice: 'WP90-PG660-57B',
            source: 'WB90-PG660-57B',
            family: 'BEAMER2.0',
            stage: 'CP',
            bomMd5: '0c774eab30a105eb5c166e353d8470ee',
            createdAt: new Date('2023-03-09T07:53:40.150Z'),
            updatedAt: new Date('2023-03-09T08:25:07.704Z')
          }
        ]
      }
    }
  }
]

import { PlayerController } from '../../src/controller'

describe('map games for one', () => {
  it('should properly map games for one team', () => {
    const input = {
      id: 3,
      name: 'Kaladin',
      teams: [
        {
          id: 2,
          name: 'Bridgemen',
          teamGames: [
            {
              id: 4,
              score: 7,
              game: {
                id: 2,
                teamGames: [
                  {
                    id: 3,
                    score: 4,
                    team: {
                      id: 1,
                      name: 'Fellowship',
                    },
                  },
                ],
              },
            },
            {
              id: 7,
              score: 8,
              game: {
                id: 4,
                teamGames: [
                  {
                    id: 8,
                    score: 5,
                    team: {
                      id: 4,
                      name: 'Mistborn',
                    },
                  },
                ],
              },
            },
            {
              id: 11,
              score: 1,
              game: {
                id: 6,
                teamGames: [
                  {
                    id: 12,
                    score: 3,
                    team: {
                      id: 3,
                      name: 'Ka-tet',
                    },
                  },
                ],
              },
            },
            {
              id: 16,
              score: 4,
              game: {
                id: 8,
                teamGames: [
                  {
                    id: 15,
                    score: 4,
                    team: {
                      id: 1,
                      name: 'Fellowship',
                    },
                  },
                ],
              },
            },
            {
              id: 19,
              score: 1,
              game: {
                id: 10,
                teamGames: [
                  {
                    id: 20,
                    score: 5,
                    team: {
                      id: 4,
                      name: 'Mistborn',
                    },
                  },
                ],
              },
            },
            {
              id: 23,
              score: 6,
              game: {
                id: 12,
                teamGames: [
                  {
                    id: 24,
                    score: 9,
                    team: {
                      id: 3,
                      name: 'Ka-tet',
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          id: 5,
          name: 'Cosmere',
          teamGames: [
            {
              id: 25,
              score: 6,
              game: {
                id: 13,
                teamGames: [
                  {
                    id: 26,
                    score: 9,
                    team: {
                      id: 3,
                      name: 'Ka-tet',
                    },
                  },
                ],
              },
            },
            {
              id: 27,
              score: 5,
              game: {
                id: 14,
                teamGames: [
                  {
                    id: 28,
                    score: 2,
                    team: {
                      id: 1,
                      name: 'Fellowship',
                    },
                  },
                ],
              },
            },
            {
              id: 29,
              score: 7,
              game: {
                id: 15,
                teamGames: [
                  {
                    id: 30,
                    score: 1,
                    team: {
                      id: 3,
                      name: 'Ka-tet',
                    },
                  },
                ],
              },
            },
            {
              id: 31,
              score: 5,
              game: {
                id: 16,
                teamGames: [
                  {
                    id: 32,
                    score: 5,
                    team: {
                      id: 1,
                      name: 'Fellowship',
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    }
    const output = {
      name: 'Kaladin',
      teams: [
        {
          name: 'Bridgemen',
          teamGames: [
            {
              score: 7,
              opposingTeam: 'Fellowship',
              opposingScore: 4,
            },
            {
              score: 8,
              opposingTeam: 'Mistborn',
              opposingScore: 5,
            },
            {
              score: 1,
              opposingTeam: 'Ka-tet',
              opposingScore: 3,
            },
            {
              score: 4,
              opposingTeam: 'Fellowship',
              opposingScore: 4,
            },
            {
              score: 1,
              opposingTeam: 'Mistborn',
              opposingScore: 5,
            },
            {
              score: 6,
              opposingTeam: 'Ka-tet',
              opposingScore: 9,
            },
          ],
        },
        {
          name: 'Cosmere',
          teamGames: [
            {
              score: 6,
              opposingTeam: 'Ka-tet',
              opposingScore: 9,
            },
            {
              score: 5,
              opposingTeam: 'Fellowship',
              opposingScore: 2,
            },
            {
              score: 7,
              opposingTeam: 'Ka-tet',
              opposingScore: 1,
            },
            {
              score: 5,
              opposingTeam: 'Fellowship',
              opposingScore: 5,
            },
          ],
        },
      ],
    }
    const actual = PlayerController.mapGamesForOne(input)
    expect(actual).toStrictEqual(output)
  })
})

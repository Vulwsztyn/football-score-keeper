import { TeamController } from '../../src/controller'

describe('map games for one', () => {
  it('should properly map games for one team', () => {
    const input = {
      id: 1,
      name: 'Fellowship',
      teamGames: [
        {
          id: 1,
          score: 3,
          game: {
            id: 1,
            teamGames: [
              {
                id: 2,
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
          id: 3,
          score: 4,
          game: {
            id: 2,
            teamGames: [
              {
                id: 4,
                score: 7,
                team: {
                  id: 2,
                  name: 'Bridgemen',
                },
              },
            ],
          },
        },
        {
          id: 5,
          score: 9,
          game: {
            id: 3,
            teamGames: [
              {
                id: 6,
                score: 2,
                team: {
                  id: 3,
                  name: 'Ka-tet',
                },
              },
            ],
          },
        },
        {
          id: 13,
          score: 9,
          game: {
            id: 7,
            teamGames: [
              {
                id: 14,
                score: 9,
                team: {
                  id: 4,
                  name: 'Mistborn',
                },
              },
            ],
          },
        },
        {
          id: 15,
          score: 4,
          game: {
            id: 8,
            teamGames: [
              {
                id: 16,
                score: 4,
                team: {
                  id: 2,
                  name: 'Bridgemen',
                },
              },
            ],
          },
        },
      ],
    }
    const output = {
      name: 'Fellowship',
      teamGames: [
        {
          score: 3,
          opposingScore: 'Mistborn',
          opposingTeam: 5,
        },
        {
          score: 4,
          opposingScore: 'Bridgemen',
          opposingTeam: 7,
        },
        {
          score: 9,
          opposingScore: 'Ka-tet',
          opposingTeam: 2,
        },
        {
          score: 9,
          opposingScore: 'Mistborn',
          opposingTeam: 9,
        },
        {
          score: 4,
          opposingScore: 'Bridgemen',
          opposingTeam: 4,
        },
      ],
    }
    expect(TeamController.mapGamesForOne(input)).toBe(output)
  })
})

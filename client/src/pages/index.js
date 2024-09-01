
module.exports = [
  {
    url: '/i-play-teemo-jungle',
    style: {
      backgroundSize: 'cover'
    },
    image: require('./Teemo/assets/Teemo_27.jpg'),
    import: () => import('./Teemo'),
  },
  {
    target: '_blank',
    style: {
      backgroundColor: '#013a60',
    },
    url: 'https://steamcommunity.com/id/kanax-stratz/',
    image: require('../assets/Steam.webp'),
  },
  {
    target: '_blank',
    style: {
      backgroundColor: '#000000',
    },
    url: 'https://www.youtube.com/@its-geptyro',
    image: require('../assets/youtube.jpg'),
  },
  {   
    target: '_blank',
    url: 'https://github.com/kanaxz',
    style: {
      backgroundColor: '#e1e1e1',
    },
    image: require('../assets/github.png'),
  },
  {
    target: '_blank',
    url: 'https://www.leagueofgraphs.com/summoner/euw/GEPTYRO-FTW',
    style: {
      backgroundSize: 'cover'
    },
    image: require('../assets/lol.jpg'),
  }
]



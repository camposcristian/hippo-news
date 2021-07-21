import axios from 'axios';


export default function handler(
  req: any,res: any
) {
  const { GUARDIAN_API_URL, GUARDIAN_API_KEY } = process.env;
  axios({
    method: 'GET',
    url: `${GUARDIAN_API_URL}search`,
    params: {
      page: req.query.page,
      'page-size': 15,
      q: req.query.q,
      'show-fields': 'body,headline,thumbnail',
      'api-key': GUARDIAN_API_KEY,
    },
  })
  .then((news) => {
      var sections = Object.values(news.data.response.results.reduce((a: any,{
        sectionName,
        id,
        webTitle,
        fields
      }: any) => {
        if (!a[sectionName]) a[sectionName] = {sectionName: sectionName, news: []};
        a[sectionName].news.push( { sectionName, id, webTitle,fields });
        return a;
      }, {}))
        res.status(200).json(sections);
  })
    .catch((error) => {
      res.status(501).json({ name: 'Error!'} );
    });
}

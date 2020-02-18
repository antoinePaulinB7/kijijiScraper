const Apify = require('apify');

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: 'https://www.kijiji.ca/b-appartement-condo/ville-de-montreal/c37l1700281?radius=4.0&price=__1000&address=Montr%C3%A9al%2C+QC+H2V&ll=45.516059,-73.604619&meuble=0' });
    const pseudoUrls = [new Apify.PseudoUrl('https://www.kijiji.ca/b-appartement-condo/ville-de-montreal/[(page-[0-9]+\/)?]c37l1700281?radius=4.0&price=__1000&address=Montr%C3%A9al%2C+QC+H2V&ll=45.516059,-73.604619&meuble=0')];

    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        handlePageFunction: async ({ request, page }) => {
            const title = await page.title();
            console.log(`Title of ${request.url}: ${title}`);
            // var infos = page.querySelectorAll('.search-item .info');

            // infos.each((inf)=>{
            //   console.log(inf);
            // });

            const data = await page.evaluate(
              () =>  Array.from(document.querySelectorAll('.search-item')).forEach((elem) => {

              })
            );

            await Apify.utils.enqueueLinks({ page, selector: 'a', pseudoUrls, requestQueue });
        },
        maxRequestsPerCrawl: 100,
        maxConcurrency: 10,
    });

    await crawler.run();
});
window.FVRST_CONFIG = {
  freeShippingThreshold: 599,
  baseDelivery: 30
};

const FVRST_PRODUCT_ASSET_BASE = document.body?.dataset.productAssetBase || '';
const productAsset = (file) => FVRST_PRODUCT_ASSET_BASE + file;

window.FVRST_PRODUCTS = [
  {
    id: 'mono-tee-01',
    slug: 'travis-scott-oversized-tee',
    name: 'Travis Scott Oversized Tee',
    shortName: 'Travis Oversized Tee',
    category: 'Oversized tee',
    badge: 'New drop',
    price: 649,
    compare: 1200,
    description: 'Heavyweight 240 GSM cotton. Oversized washed-black fit with a front Travis Scott graphic and clean blank back.',
    color: 'Washed black',
    origin: 'Made in India',
    images: {
      main: productAsset('preview1.webp'),
      hover: productAsset('preview3.webp'),
      back: productAsset('preview2.webp'),
      hero: productAsset('inmotion1.webp'),
      editorial: productAsset('preview5.webp'),
      gallery: [
        { label: 'Front', src: productAsset('preview1.webp'), alt: 'Travis Scott Oversized Tee front view' },
        { label: 'Back', src: productAsset('preview2.webp'), alt: 'Travis Scott Oversized Tee back view' },
        { label: 'Front + Back', src: productAsset('preview3.webp'), alt: 'Travis Scott Oversized Tee front and back product view' },
        { label: 'Styled', src: productAsset('preview4.webp'), alt: 'Model wearing Travis Scott Oversized Tee front view' },
        { label: 'Styled', src: productAsset('preview5.webp'), alt: 'Model wearing Travis Scott Oversized Tee styled view' }
      ],
      motion: [
        { src: productAsset('inmotion1.webp'), alt: 'Model wearing Travis Scott Oversized Tee front view', tall: true },
        { src: productAsset('inmotion2.webp'), alt: 'Model wearing Travis Scott Oversized Tee back view' },
        { src: productAsset('inmotion3.webp'), alt: 'Model wearing Travis Scott Oversized Tee alternative front view' },
        { src: productAsset('inmotion4.webp'), alt: 'Model wearing Travis Scott Oversized Tee alternative back view' },
        { src: productAsset('inmotion5.webp'), alt: 'Model wearing Travis Scott Oversized Tee fit detail' },
        { src: productAsset('inmotion6.webp'), alt: 'Model wearing Travis Scott Oversized Tee back detail' }
      ]
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'L',
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 },
    specs: [
      ['Fabric', '100% cotton, 240 GSM jersey'],
      ['Fit', 'Relaxed oversized cut'],
      ['Colour', 'Washed black, cream print'],
      ['Print', 'Water-based front screenprint, blank back'],
      ['Care', 'Cold wash, inside out, no tumble dry'],
      ['Origin', 'Made in India']
    ],
    proof: [
      ['240 GSM', 'Heavyweight cotton that drapes well and holds shape wash after wash.', 'Cotton'],
      ['Oversized', 'Relaxed boxy cut with dropped shoulders for a true streetwear silhouette.', 'Fit'],
      ['Washed Black', 'Pre-washed finish for a softer hand-feel and lived-in look from day one.', 'Finish'],
      ['Front Print', 'Water-based front screenprint with a clean blank back, designed to age naturally with wear.', 'Print']
    ],
    reviewSummary: {
      rating: '4.9',
      text: 'based on recent verified orders'
    },
    reviews: [
      {
        name: 'Ananya R.',
        photo: productAsset('review3.webp'),
        quote: 'Really loved the fit and quality. The fabric feels premium and the print is sharp.'
      },
      {
        name: 'Vihal Jiarni',
        photo: productAsset('review1.webp'),
        quote: 'Nice t-shirt, print quality and fit is perfect.'
      },
      {
        name: 'Arnav',
        photo: productAsset('review2.webp'),
        quote: 'Really comfortable and pairs well with my grunge hoods. Great for bike rides too.'
      }
    ]
  }
];

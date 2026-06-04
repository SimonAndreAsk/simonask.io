import {create, defineMigration} from 'sanity/migrate'

/** Step 2c: create projectTechnology docs (after delete-project-tag-documents). */
const TECHNOLOGY_DOCS = [
  {
    _id: '7ee2a53f-9084-4c06-8f21-59882e08dc6d',
    label: 'Sanity',
    backgroundColor: {
      _type: 'color',
      alpha: 1,
      hex: '#f9bc15',
      hsl: {_type: 'hslaColor', a: 1, h: 43.94736842105264, l: 0.5294117647058824, s: 0.9500000000000001},
      hsv: {_type: 'hsvaColor', a: 1, h: 43.94736842105264, s: 0.9156626506024096, v: 0.9764705882352941},
      rgb: {_type: 'rgbaColor', a: 1, b: 21, g: 188, r: 249},
    },
  },
  {
    _id: 'caca98a8-309f-4d1d-bd64-f68fe2267428',
    label: 'Vercel',
    backgroundColor: {
      _type: 'color',
      alpha: 1,
      hex: '#050809',
      hsl: {_type: 'hslaColor', a: 1, h: 199.99999999999997, l: 0.028372225, s: 0.30761686825760043},
      hsv: {_type: 'hsvaColor', a: 1, h: 199.99999999999997, s: 0.4704999999999999, v: 0.0371},
      rgb: {_type: 'rgbaColor', a: 1, b: 9, g: 8, r: 5},
    },
  },
  {_id: 'f7998a02-694f-4ccd-9381-5a7d83fe38ec', label: 'Next.js'},
  {_id: '87ba28d1-5f0a-4987-b5e3-25e5940909d2', label: 'React'},
  {_id: '0224295e-7e84-47b7-acd6-5ae1391aa735', label: 'Cloudflare'},
] as const

export default defineMigration({
  title: 'Technologies step 2c: create projectTechnology documents',
  async *migrate() {
    for (const doc of TECHNOLOGY_DOCS) {
      const {_id, label, ...rest} = doc
      yield create({
        _id,
        _type: 'projectTechnology',
        label,
        ...rest,
      })
    }
  },
})

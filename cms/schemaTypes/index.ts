import {blockContentType} from './objects/blockContentType'
import {calloutType} from './blocks/calloutType'
import {codeBlockType} from './blocks/codeBlockType'
import {figureType} from './blocks/figureType'
import {mermaidDiagramType} from './blocks/mermaidDiagramType'
import {experienceType} from './documents/experienceType'
import {postCategoryType} from './documents/postCategoryType'
import {postType} from './documents/postType'
import {projectTechnologyType} from './documents/projectTechnologyType'
import {projectType} from './documents/projectType'

export const schemaTypes = [
  postType,
  projectType,
  projectTechnologyType,
  postCategoryType,
  experienceType,
  blockContentType,
  calloutType,
  figureType,
  codeBlockType,
  mermaidDiagramType,
]

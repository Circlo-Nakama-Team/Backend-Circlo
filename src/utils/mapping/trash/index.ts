import { type mapDBModelTrashCategoriesType } from '../../types/TrashTypes'
const mapDBModelTrashCategories = ({
  CATEGORIESID,
  CATEGORIES_NAME,
  REWARD_POINT

}: mapDBModelTrashCategoriesType): any => ({
  categoryId: CATEGORIESID,
  categoryName: CATEGORIES_NAME,
  rewardPoint: REWARD_POINT
})

export { mapDBModelTrashCategories }

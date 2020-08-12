import * as productActions from './productActions';
import * as categoryActions from './categoryActions'
import * as authActions from './authActions';
import * as cartActions from './cartActions';
import * as postActions from './postActions';
export default {
  ...productActions,
  ...categoryActions,
  ...authActions,
  ...cartActions,
  ...postActions,
}
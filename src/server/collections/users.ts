import { extend } from '@nocobase/database';
import { userExtendField } from '../../constants';

export default extend({
  name: 'users',
  fields: [userExtendField()],
});

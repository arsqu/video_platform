import { Row, Col, Input, Icon, Result, Spin, message, Select, Button, Divider, Checkbox, FormModel, Dropdown, Menu } from 'ant-design-vue'
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Result)
Vue.use(Spin)
Vue.use(Select)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Checkbox)
Vue.use(FormModel)
Vue.use(Dropdown)
Vue.use(Menu)

Vue.prototype.$message = message

export default {
  Row,
  Col,
  Input,
  Icon,
  Result,
  Spin,
  Select,
  Button,
  Divider,
  Checkbox,
  FormModel,
  Dropdown,
  Menu
}

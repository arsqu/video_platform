import { Icon, InputNumber, Drawer, Result, Spin, message, Upload, Modal, Select, Steps, List, Table, Row, Col, Input, TimePicker, Card, Pagination, DatePicker, ConfigProvider, Button, Divider, Checkbox, FormModel, Tooltip, Dropdown, Menu } from 'ant-design-vue'
// Descriptions,
Vue.use(Icon)
Vue.use(InputNumber)
Vue.use(Drawer)
// Vue.use(Descriptions)
Vue.use(Result)
Vue.use(Spin)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Steps)
Vue.use(List)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(ConfigProvider)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(FormModel)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(Menu)

Vue.prototype.$message = message
message.config({
  top: '50%'
})

export default {
  Icon,
  Drawer,
  // Descriptions,
  Upload,
  Modal,
  Steps,
  List,
  Table,
  Row,
  Col,
  Input,
  Pagination,
  TimePicker,
  DatePicker,
  ConfigProvider,
  Button,
  Divider,
  Checkbox,
  FormModel,
  Tooltip,
  Dropdown,
  Menu
}

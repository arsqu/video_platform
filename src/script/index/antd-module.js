import { Layout, Result, Switch, Tabs, Breadcrumb, Avatar, Icon, Badge, Popover, Tag, Spin, message, Upload, Modal, Select, Table, Row, Col, Input, Pagination, TimePicker, DatePicker, ConfigProvider, Button, Divider, Checkbox, FormModel, Tooltip, Dropdown, Menu } from 'ant-design-vue'
Vue.use(Layout)
Vue.use(Result)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(Breadcrumb)
Vue.use(Avatar)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Spin)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Select)
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
Vue.use(Checkbox)
Vue.use(FormModel)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(Menu)

Vue.prototype.$message = message
Vue.prototype.$Modal = Modal
message.config({
  top: '50%'
})

export default {
  Layout,
  Result,
  Switch,
  Tabs,
  Breadcrumb,
  Avatar,
  Icon,
  Badge,
  Popover,
  Tag,
  Spin,
  Upload,
  Modal,
  Select,
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

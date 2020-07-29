<template>
  <div>
    <p :style="[pStyle, pStyle2]">User Profile</p>
    <p :style="pStyle">Personal</p>
    <a-row>
      <a-col :span="12">
        <viewItem :title="'Full Name'" :content="'Lily'" />
      </a-col>
      <a-col :span="12">
        <viewItem :title="'Account'" :content="'AntDesign@example.com'" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <viewItem :title="'City'" :content="'HangZhou'" />
      </a-col>
      <a-col :span="12">
        <viewItem :title="'Country'" :content="'China🇨🇳'" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <viewItem :title="'Birthday'" :content="'February 2,1900'" />
      </a-col>
      <a-col :span="12">
        <viewItem :title="'Website'" :content="'-'" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <viewItem
          :title="'Message'"
          :content="'Make things as simple as possible but no simpler.'"
        />
      </a-col>
    </a-row>
    <a-divider />
    <p :style="pStyle">Company</p>
    <a-row>
      <a-col :span="12">
        <viewItem :title="'Position'" :content="'Programmer'" />
      </a-col>
      <a-col :span="12">
        <viewItem :title="'Responsibilities'" :content="'Coding'" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <viewItem :title="'Department'" :content="'XTech'" />
      </a-col>
      <a-col :span="12">
        <viewItem :title="'Supervisor'">
          <a slot="content">Lin</a>
        </viewItem>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <viewItem
          :title="'Skills'"
          :content="'C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.'"
        />
      </a-col>
    </a-row>
    <a-divider />
    <p :style="pStyle">Contacts</p>
    <a-row>
      <a-col :span="12">
        <viewItem :title="'Email'" :content="'ant-design-vue@example.com'" />
      </a-col>
      <a-col :span="12">
        <viewItem :title="'Phone Number'" :content="'+86 181 0000 0000'" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <viewItem :title="'Github'">
          <a
            slot="content"
            href="https://github.com/vueComponent/ant-design-vue"
          >github.com/vueComponent/ant-design-vue</a>
        </viewItem>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  componenets: {
    viewItem: {
      template: ` <div class="site-description-item-profile-wrapper">
    <p class="site-description-item-profile-p-label">{{title}}:</p>
    {{content}}
  </div>`,
      props: {
        title: String,
        content: String
      }
    }
  },
  data() {
    return {
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      pStyle2: {
        marginBottom: '24px'
      }
    }
  }
}
</script>

<style>
</style>

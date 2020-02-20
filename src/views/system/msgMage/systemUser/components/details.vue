<template>
  <div style="height:100%;">
    <vue-scroll>
      <div class="details">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>用户名</td>
            <td>{{ data.username }}</td>
            <td>姓名</td>
            <td>{{ data.name }}</td>
          </tr>
          <tr>
            <td>管辖部门</td>
            <td>{{ data.orgName }}</td>
            <td>性别</td>
            <td>{{ data.sexStr }}</td>
          </tr>
          <tr>
            <td>电话号码</td>
            <td>{{ data.phone }}</td>
            <td>状态</td>
            <td>{{ data.status }}</td>
          </tr>
        </table>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: 'Viwe',
  props: {
    data: {
      type: Object,
      default() {
        return
      }
    }
  }
}
</script>

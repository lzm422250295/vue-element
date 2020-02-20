<template>
  <div>
    <el-row class="white-box">
      <ProcessTree :data="data" />
    </el-row>
  </div>
</template>

<script>
import ProcessTree from '@/components/ProcessTree/index'
export default {
  name: 'TableDemo',
  components: {
    ProcessTree
  },
  data() {
    return {
      data: [{
        'id': '00000019740016',
        'type': '32',
        'tit': '测试',
        'all': 5,
        'data': {
        },
        'children': [{
          'id': '32110000034519',
          'type': '31',
          'tit': '标题1',
          'all': 3,
          'data': {
          },
          'children': [{
            'id': '32110000034519',
            'children': [],
            'type': '31',
            'tit': '标题3',
            'all': 1,
            'data': {
            }
          }, {
            'id': '32110000034519',
            'children': [],
            'type': '31',
            'tit': '标题4',
            'all': 1,
            'data': {
            }
          }, {
            'id': '32110000034519',
            'children': [],
            'type': '31',
            'tit': '标题5',
            'all': 1,
            'data': {
            }
          }]
        }, {
          'id': '32110000034519',
          'children': [],
          'type': '31',
          'tit': '标题2',
          'all': 1,
          'data': {
          }
        }]
      }]
    }
  }
}
</script>

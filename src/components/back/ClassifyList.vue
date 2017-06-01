<template>
	<el-row>
		<el-row style="margin-bottom: 15px;">
			<el-col :span="24">
				<el-button size="small" type="primary" @click="dialogFormVisible = true">添加分类</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
        <el-row class="class_list_title">
          <el-col :span="3">序号</el-col>
          <el-col :span="6">分类</el-col>
          <el-col :span="6">操作</el-col>
        </el-row>
        <li v-for="(item, index) in classlists" class="class_list_item" style="list-style: none;">
          <span class="num">{{index+1}}</span>
          <span class="ca">{{item.classname}}</span>
          <el-button type="primary" size="small" @click="delclass(index)">删除</el-button>
        </li>
		  </el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
<el-dialog title="添加分类" v-model="dialogFormVisible">
  <el-form>
    <el-form-item label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="obj.classname" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveClass">确 定</el-button>
  </div>
</el-dialog>
			</el-col> 
		</el-row>
    <el-row class="page">
      <el-col :span="24" >
          <el-pagination layout="sizes,prev,pager,next" @current-change="handleCurrentChange" :total="total" :page-size="limit"></el-pagination>
      </el-col>
    </el-row>
	</el-row>
</template>

<script>
// import {mapActions} from 'vuex'
import api from '../../api'
export default {
  data () {
    return {
      classlists: [],
      dialogFormVisible: false,
      obj: {
        classname: ''
      },
      formLabelWidth: '120px',
      total: 100,
      page: 1,
      limit: 10
    }
  },
  methods: {
    saveClass () {
      this.dialogFormVisible = false
      // var obj = {
      //   classname: this.classname,
      //   create_at: new Date()
      // }
      var OBJ = {
        classname: this.obj.classname
      }
      // this.$http.post('/api/classify/save', {CLASS: OBJ})
      api.saveClassify({CLASS: OBJ})
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
    },
    delclass (index) {
      // this.$http.post('/api/classify/del', {_id: this.classlists[index]._id})
      api.delClassify({_id: this.classlists[index]._id})
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
    },
    handleCurrentChange (val) {
      this.page = val
      this.getLists()
    },
    getLists () {
      setInterval(() => {
        // this.$http.get('/api/classify/list')
        api.getClassifyList({page: this.page, limit: this.limit})
        .then((response) => {
          this.classlists = response.data
        })
      }, 200)
    }
  },
  mounted () {
    this.getLists()
  }
}
</script>
<style scoped>
  .class_list_title{
    background: #EEF1F6;
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
  }
  .class_list_item{
    height: 35px;
    line-height: 35px;
    padding-bottom: 5px;
    border-bottom: 1px solid #BEBEBE;
  }
  .num{
    width: 100px;
    display: inline-block;
    text-align: center;
  }
  .ca{
    width: 100px;
    margin-right: 160px;
    margin-left: 15px;
    display: inline-block;
    text-align: center;
  }
  .page{
      position: absolute;
      top: 520px;
      right: 20px;
    }
</style>

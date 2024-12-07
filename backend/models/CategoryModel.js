const mongoose =require ('mongoose')

const DataSchema=mongoose.Schema({
    categoryName:{type:String, unique:true ,required:true},
    categoryImg:{type:String},
},
{timestamps:true,versionKey:false}

)

const CategoryModel=mongoose.model('category', DataSchema)
module.exports=CategoryModel
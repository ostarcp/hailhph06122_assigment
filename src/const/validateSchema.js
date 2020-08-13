import * as Yup from 'yup';


const FILE_SIZE = 500000;

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];


const validationProduct = Yup.object().shape({
  name: Yup.string()
    .required('You need to fill in product name')
    .trim(),
  quanity: Yup.number()
    .required('You need to fill in product quanity')
    .positive('Quanity must be positive')
    .integer('Ingter required'),
  image: Yup.string()
    .required('fill in image')
    .trim(),
  cateId: Yup.number()
    .typeError('error')
    .required('pick a category'),
  contents: Yup.string()
    .required('fill in Contents')
    .trim(),
  price: Yup.number()
    .required('fill in Price')
    .positive('Price must be positive')
  // .test(
  //   'is-decimal',
  //   'invalid price',
  //   value => (value + "").match(/^\d*\.{1}\d*$/),
  // )
  ,
  salePrice: Yup.number()
    .typeError('Invalid type'),
  shortDes: Yup.string()
    .required('fill in image')
    .trim(),
});

//

const validationCate = Yup.object().shape({
  name: Yup.string()
    .required('You need to fill in category name')
    .trim(),
  image: Yup.mixed()
    .required('fill in image')
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
});

const validationCateEdit = Yup.object().shape({
  name: Yup.string()
    .required('You need to fill in category name')
    .trim(),
  image: Yup.mixed()
    .required('fill in image')
});

//

const validationPost = Yup.object().shape({
  title: Yup.string()
    .required('You need to fill in title name')
    .trim(),
  image: Yup.mixed()
    .required('fill in image')
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  contents: Yup.string()
    .required('fill in Contents')
});

const validationEditPost = Yup.object().shape({
  title: Yup.string()
    .required('You need to fill in title name')
    .trim(),
  image: Yup.mixed()
    .required('fill in image'),
  contents: Yup.string()
    .required('fill in Contents')
});

// const validationCate = Yup.object().shape({
//   name: Yup.string()
//   .required('You need to fill in category name')
//   .test(
//     "checkname",
//     "Exits baby",
//      value => value && cateList.every(el => el.name.trim() != value.trim())
//   )
//     // .test(
//     //   "checkname",
//     //   "exits",
//     //   function () {
//     //     const { name } = this.parent;
//     //     if (name && cateList.every(el => el.name != name)) {
//     //       return true
//     //     }
//     //     return false;
//     //   }
//     // )
// });


export {
  validationProduct,
  validationCate,
  validationCateEdit,
  validationPost,
  validationEditPost

}
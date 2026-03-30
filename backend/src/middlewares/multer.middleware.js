import multer from 'multer'

//using diskstorage bcz file size can be big.
//  https://www.npmjs.com/package/multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // file req.body me nahi hoti hai
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })



//Q. if we are puting our file in public folder then does public folder not served to all users. ?? 
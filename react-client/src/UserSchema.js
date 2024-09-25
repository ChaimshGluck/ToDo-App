import * as Yup from 'yup';
import assert from 'assert'

// const ourYup = {
//     validations: [],
//     string: function () {
//         this.validations.push('string');
//         return this;
//     },
//     number: function () {
//         this.validations.push('number')
//         return this;
//     },
//     length: function (n) {
//         this.validations.push({ validation: "length", length: n })
//         return this;
//     },
//     validate: function (str) {
//         for (let val of this.validations) {
//             if (val === 'string' || val === 'number') {
//                 assert(typeof str === val)
//             }
//             if (typeof validation === 'object') {
//                 assert(str.toString().length == val.length)
//             }
//         }
//         this.validations = [];
//     }
// }

// ourYup.string().length(5);
// ourYup.validate("abcde");

const UserSchema = Yup.object().shape({
    first_name_input: Yup.string()
        .min(1, 'First name is required')
        .required('First name is required'),
    last_name_input: Yup.string(),
    new_user_email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    new_username_input: Yup.string()
        .min(5, 'Username must be at least 5 characters')
        .max(15, 'Username cannot be more than 15 characters')
        .required('Username is required'),
    new_user_pass: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
});

export default UserSchema;

const article = `f I have ignored files on a branch in my local git repo, 
but the gitignore is only in the branch, when I check out to the master branch will the ignored files persist? 
To explain the scenario I created a client folder in a branch with vite And it gave me node modules 
and the git ignore file as usual, but when I check back out to the master branch the node modules folder comes 
in as uncommitted changes, I don't understand why the entire client folder was only created on the branch why is it 
even coming up in the master branchIf`

const regEx = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]$/

const result = regEx.test(article);
// const result = article.match(regEx);
// console.log(regEx.exec(article));
// console.log(result)
import axios from 'axios'
import useAuthStore from '../store/AuthStore';
const setUser=useAuthStore.getState().setUser;
class authService{
    signup=async ({userName,fullName,email,password,avatar,coverImage})=>{
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        avatar.length&&formData.append('avatar', avatar[0]);
        formData.append('coverImage', coverImage);
        try {
            const response=await axios.post('/api/v1/users/register',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            this.login({userName,password});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    login=async ({userName,password})=>{
        try {
            const resp=await axios.post('/api/v1/users/login',{
                userName:userName,
                password
            })
            useAuthStore.getState().setUser(resp.data.data.user);
            return resp.data.data.user
        } catch (error) {
            console.log(error.response);
            console.log(error.response.data);
            alert("Login failed: invalid user credentials");
        }
    }
};
const AuthService=new authService();
export default AuthService;
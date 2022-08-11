
import {useState, useEffect} from 'react';
import axios from 'axios';
 import {useParams} from "react-router-dom";
import {setHeaders, url} from "../../slices/api";
import styled from 'styled-components';
 import {toast} from 'react-toastify';
const UserProfile = () => {
    const params = useParams();
    const [user, setUser] = useState({
        name: "",
        email: "",
        isAdmin: false,
        isStaff: false,
        password: "",
         
        address: "",
        phone: "",
        city: "",
        country: "",
        district: "",
        dob: "",
        qualifications: "",
        state: "",
        experience: "",
        assignProject: "",
        designation: "",
        photo: "",
    });
    console.log(user);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${url}/users/find/${params.id}`, setHeaders());
                setUser({
                    ...res.data,
                    password: "",

                });
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchUser();
        setLoading(false);
    }, [params.id]);

    const handleUserImage = (e) => {
        const file = e.target.files[0];
        TransFormFile(file);
    };
    const TransFormFile = (file) => {
        const reader = new FileReader()
        if(file){
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setUser({
                    ...user,
                    photo: e.target.result
                })
            }
        }
        else{
                setUser({
                    ...user,
                    photo: ""
                })


            }


        }

    const handleSubmit =   async (e) => {
        e.preventDefault();
        setUpdating(true);
        try{
  const res = axios.put(`${url}/users/${params.id}`, 
  {...user}, 
  setHeaders());
  setUser({
        ...res.data,
        password: "",
    
  })

toast.success("User updated successfully");
    console.log(res);
    setUpdating(false);

        }
        catch(err){
            console.log(err);
        }
        setUpdating(false);


    };

    return (
        <StyledProfile>
                <ProfileContainer>
                    {
                        loading ? (<p>Loading...</p> 
                        ) :
                        (
                            <Form onSubmit={handleSubmit}>
                                 {
                                    user.isAdmin ? (
                                        <Admin>
                                            admin
                                        </Admin>
                                    ) :
                                    
                                        user.isStaff ? (
                                            <Staff>
                                                staff
                                            </Staff>
                                        )
                                    :
                                     (
                                        <Customer>
                                            customer
                                        </Customer>
                                    )  
                                }
                                
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" value={user.name} onChange={(e) => setUser({ ...user,name:e.target.value})}  />
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" value={user.email} onChange={(e) => setUser({ ...user,email:e.target.value})} />
                                <label htmlFor="password">Password</label>
                                <input type="text" name="password" id="password" value={user.password} onChange={(e) => setUser({ ...user,password:e.target.value})}/>
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" id="address" value={user.address} onChange={(e) => setUser({ ...user,address:e.target.value})}/>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name="phone" id="phone" value={user.phone} onChange={(e) => setUser({ ...user,phone:e.target.value})}/>
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" id="city" value={user.city} onChange={(e) => setUser({ ...user,city:e.target.value})}/>
                                <label htmlFor="country">Country</label>
                                <input type="text" name="country" id="country" value={user.country} onChange={(e) => setUser({ ...user,country:e.target.value})}/>
                                <label htmlFor="district">District</label>
                                <input type="text" name="district" id="district" value={user.district} onChange={(e) => setUser({ ...user,district:e.target.value})}/>
                                <label htmlFor="dob">DOB</label>
                                <input type="number" name="dob" id="dob" value={user.dob} onChange={(e) => setUser({ ...user,dob:e.target.value})}/>
                                <label htmlFor="qualifications">Qualifications</label>
                                <input type="text" name="qualifications" id="qualifications" value={user.qualifications} onChange={(e) => setUser({ ...user,qualifications:e.target.value})}/>
                                <label htmlFor="state">State</label>
                                <input type="text" name="state" id="state" value={user.state} onChange={(e) => setUser({ ...user,state:e.target.value})}/>
                                <label htmlFor="experience">Experience</label>
                                <input type="text" name="experience" id="experience" value={user.experience} onChange={(e) => setUser({ ...user,experience:e.target.value})}/>
                                <label htmlFor="assignProject">Assign Project</label>
                                <input type="text" name="assignProject" id="assignProject" value={user.assignProject} onChange={(e) => setUser({ ...user,assignProject:e.target.value})}/>
                                <label htmlFor="designation">Designation</label>
                                <select name="designation" id="designation" value={user.designation} onChange={(e) => setUser({ ...user,designation:e.target.value})}>
                                    <option value="">Select</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Tester">Tester</option>
                                    <option value="Manager">Manager</option>
                                </select>
                                
                                <label htmlFor="photo">Photo</label>
                                <input type="file" accept='image/' name="photo" id="photo" onChange={handleUserImage} />
                                
 
                                 
                                 <button type="submit" >{
                                    updating ? "updating" : "updating user"
                                }
                                     
                            </button>


                            </Form>
                          
                         
                    )}
                UserProfile {params.id}
                </ProfileContainer>
            
            </StyledProfile>
    )
}
export default UserProfile;


 
const StyledProfile = styled.div`
margin: 3rem;
display: flex;
justify-content: center;
`;
const ProfileContainer = styled.div`
display: flex;
max-width: 500%;
height: auto;
border-radius: 10px;
background-color: #f5f5f5;

`;
const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Admin = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
const Customer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
const Staff = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;




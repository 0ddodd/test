import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/authService";
import { auth } from "../auth/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import CustomButton from "./customButton";
import Swal from "sweetalert2";

function NavBar() {

    const [user, setUser] = useState<User | null>(null);
    const onLogout = async () => {

        const result = await Swal.fire({
            title:  `<span style="font-size: 16px;">정말 로그아웃 하시겠습니까?</span>`,
            showCancelButton: true,
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            confirmButtonColor: '#3085d6',
        })
    
        if (result.isConfirmed) {
            try {
                const resp = await logout();
                localStorage.removeItem("user_info");
                console.log(resp);
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('로그아웃 취소');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if(currentUser) {

            } else {

            };
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to='/'>
                    <i className="bi bi-map text-dark fs-5"></i>
                </Link>
                {user &&
                    <div>
                        <Link to="/posts">
                            <CustomButton
                                text="마이페이지"
                            />
                        </Link>
                        <CustomButton
                            text="로그아웃"
                            onClick={onLogout}
                        />
                    </div>
                }
                
            </div>
        </nav>
    );
    }

    export default NavBar;

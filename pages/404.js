import { useEffect, useState } from "react";
import Loader from "@/component/Loader";
import { useRouter } from "next/router";

const NotFound = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    setTimeout(() => {
        setIsLoading(false)
        // window.location.reload();
    }, 1000)
    return (
        <div>
            {isLoading ? <Loader /> : <h2>Oke 🤝</h2>}
        </div>
    )
}

export default NotFound;
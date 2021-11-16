import { useContext, useEffect } from 'react';
import Zoom from 'react-reveal/Zoom';
import { Context } from '../Context';

const ModalHorizontal = () => {

    const {modalHorizontal,setModalHorizontal } = useContext(Context)

    const setStateHorizontal = (e) => {

        if(e.target.classList.contains('fixed')) 
        {
            setModalHorizontal(false)
        }

    }

    /*useEffect(() => {

        if(modalHorizontal)
        {
            document.body.style.overflowY = 'hidden'
        }

        else
        {
            document.body.style.overflow = 'auto'
        }

    },[modalHorizontal])
    */

    return (
        <div className = 'fixed  inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-all transform duration-1000 ease-out' onClick = {setStateHorizontal}>
            <Zoom top>
                <div className = 'relative w-96  rounded-md bg-white'>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold text-red-400'> Report </span>
                    </div>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold text-red-400'> Unfollow </span>
                    </div>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold'> Go to post </span>
                    </div>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold'> Share to... </span>
                    </div>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold'> Copy Link </span>
                    </div>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold'> Embed </span>
                    </div>
                    <div className = 'statsHorizontal'>
                        <span className = 'font-semibold'> Cancel </span>
                    </div>
                </div>
            </Zoom>
        </div>
    )
}

export default ModalHorizontal

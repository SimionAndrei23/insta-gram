import { useState, useEffect, useRef, useContext } from "react"
import { db, storage,auth } from '../firebase'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from '@firebase/firestore'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import Zoom from 'react-reveal/Zoom'
import { Context } from "../Context"
import { CameraIcon } from "@heroicons/react/outline"



const ModalPost = ( {loadingConfetti,setLoadingConfetti}) => {

    const { user,modalOne, setModalOne, userFacebook } = useContext(Context)

    const [inputPost, setInputPost] = useState('')

    const filePickerRef = useRef(null);

    const [loadingPost, setLoadingPost] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null)


    const addImagePost = (e) => {

        const readerFile = new FileReader();


        if(e.target.files[0]) {

            readerFile.readAsDataURL(e.target.files[0])
        }

        // When it loads on the Browser

        readerFile.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }

    }
    const closeModal = (e) => {

        if(e.target.classList.contains('fixed')) {

            setModalOne(false)

        }
    }


    const uploadPost = async (e) => {

        e.preventDefault()

        if(loadingPost) return;

        setLoadingPost(true)

        // 1. Create the post and add to firestore into 'posts' collection
        // 2. Get the post ID for the newly created post
        // 3. Upload the image to firebase storage with the post ID
        // 4. Get the download URL from storage and update the original post

        // We are awaiting to connect to the firebase
            const docRef = await addDoc(collection(db, 'posts'), {
                userID: user?.uid || userFacebook?.uid,
                username: user?.name || userFacebook?.name,
                caption: inputPost,
                profileUser: user?.photo || userFacebook?.photo,
                timestamp: serverTimestamp()
                
            })

            const imageRef = ref(storage, `images/${docRef.id}/image`)

            await uploadString(imageRef, selectedFile, 'data_url').then( async (snapshot) => {

                const downloadURL = await getDownloadURL(imageRef)

                   await updateDoc(doc(db, 'posts', docRef.id), {

                    image: downloadURL

                  }, { merge: true})

             })
                setModalOne(false)
                setLoadingPost(false)
                setInputPost('')
                setLoadingConfetti(true)
    }

    return (
        <div onClick = {closeModal} className = 'fixed inset-0 flex items-center justify-center py-10 z-50 overflow-hidden bg-black bg-opacity-80'>
            <Zoom>
                <div className = {`${selectedFile ? 'relative bg-white pb-2 w-96 h-auto shadow-xl rounded-xl': 'relative bg-white py-4 w-96 h-80 shadow-xl rounded-xl'}`}>
                    <div className = 'absolute top-0 left-0 h-full w-full clipPath1'></div>
                    <div className = 'absolute top-0 left-0 h-full w-full clipPath2'></div>
                    <form className = 'flex flex-col items-center '>
                        {selectedFile ?  (
                            <div onClick = {() => setSelectedFile(null)}  className = 'relative w-full h-full overflow-hidden'>
                                <img className = 'block max-w-full max-h-full cursor-pointer' src = {selectedFile}  alt = 'SelectImage' />
                            </div>
                        ) : (
                                <div className = 'mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 cursor-pointer' onClick = { () => filePickerRef.current.click()}>
                                    <CameraIcon className = 'h-6 w-6 text-red-600' aria-hidden = 'true' />
                                </div>
                        )}
                            <div className = 'mt-6 z-10'> <span className = 'font-semibold text-lg'> Upload a post </span></div>
                            <div> <input type = 'file' hidden  ref = {filePickerRef} onChange = {addImagePost} /></div>
                            <div className = 'mt-4 z-10'> <input value = {inputPost} onChange = { (e) => setInputPost(e.target.value)} className = 'border-none bg-transparent focus:ring-0 w-full text-center' type = 'text' placeholder = 'Please enter a caption...' /></div>
                            <div className = 'mt-6 w-1/2 z-10'> 
                                <button onClick = {uploadPost} disabled = {!selectedFile} type = 'button' className = 'inline-flex justify-center w-full rounded-md border border-transparent shadow-md px-4 py-2 font-medium text-white bg-red-300 disabled:bg-gray-300 disabled:cursor-not-allowed   transform transition duration-700 ease-out hover:shadow-2xl cursor-pointer'>
                                    {loadingPost ? 'Uploading post...' : 'Upload post'}
                                </button>
                            </div>
                    </form>
                </div>
            </Zoom>  
        </div>
    )
}

export default ModalPost

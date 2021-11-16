
import { CogIcon, TableIcon, PlayIcon, BookmarkIcon, UserGroupIcon, } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useContext } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Context } from '../Context'


const ProfileStats = ( {postLine, postSaved,tagged} ) => {

    const { user, username, userFacebook, usernameFacebook } = useContext(Context)

    const  router  = useRouter()

    return (
        <div className = 'flex flex-col   max-w-4xl mx-auto w-full'>
              <div className = 'flex items-center justify-evenly md:items-center md:justify-start  md:gap-20 gap-5 py-5 px-3  md:ml-20 pb-12'>
                  <div className = 'relative w-16 h-16 md:w-20 md:h-20'>
                      <img className = 'absolute w-full h-full rounded-full object-cover cursor-pointer' src = {user?.photo || userFacebook?.photo} alt = 'userImage' />
                      <span className = 'md:hidden absolute -bottom-8 -left-2 w-24 text-sm font-semibold'> {user?.name || userFacebook?.name} </span>
                  </div>
                  <div className = 'relative flex flex-col gap-5'>
                      <div className = 'flex items-center gap-6 pl-20 md:pl-0'>
                          <span className = 'font-semibold text-xl'> {username || usernameFacebook} </span>
                          <div className = 'hidden md:flex items-center justify-center p-2 border rounded-md cursor-pointer'>
                              <span className = 'font-semibold text-sm'> Edit Profile </span>
                          </div>
                          <CogIcon className = 'w-8 h-8 text-gray-500 cursor-pointer' />
                      </div>
                      <div className = 'flex-1  p-2 flex md:hidden items-center justify-center  border rounded cursor-pointer'>
                          <span className = 'font-semibold text-sm'> Edit Profile </span> 
                      </div>
                      <div className = 'hidden md:flex items-center gap-10'>
                          <div className = 'flex gap-3 items-center'>
                              <span className = 'font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-red-300'> 21 </span>
                              <span> posts </span>
                          </div>
                          <div className = 'flex gap-3 items-center'>
                              <span className = 'font-semibold text-lg'> 107 </span>
                              <span> followers </span>
                          </div>
                          <div className = 'flex gap-3 items-center'>
                              <span className = 'font-semibold text-lg'> 290 </span>
                              <span> following </span>
                          </div>
                      </div>
                      <div className = 'hidden md:flex'>
                          <span className = 'font-semibold text-lg'> {user?.name} </span>
                      </div>
                  </div>
              </div>
              <div className = 'w-full h-20 flex md:hidden items-center justify-between px-12 border-t-2 border-gray-200 border-opacity-40'>
                    <div className = 'flex flex-col items-center'>
                        <span className = 'font-semibold'> 21 </span>
                        <span className = 'text-gray-400 text-sm'> posts </span>
                    </div>
                    <div className = 'flex flex-col items-center'>
                        <span className = 'font-semibold'> 107 </span>
                        <span className = 'text-gray-400 text-sm'> followers </span>
                    </div>
                    <div className = 'flex flex-col items-center'>
                        <span className = 'font-semibold'> 290 </span>
                        <span className = 'text-gray-400 text-sm'> following </span>
                    </div>
                </div>
                <div className = 'w-full flex pt-[1.1rem] pb-8 items-center justify-center px-12 md:px-40 border-t md:border-t-[2px] border-gray-400 border-opacity-40'>
                    <div className = 'flex md:hidden items-center justify-between w-full'>
                        {
                            postLine ? (
                                <TableIcon onClick = { () => router.push(`/component/profile/${user?.uid}/`)} className = 'iconActive' />
                            ) : (
                                <TableIcon onClick = { () => router.push(`/component/profile/${user?.uid}/`)} className = 'iconInactive' />
                            )
                        }
                        {
                            postSaved ? (
                                <BookmarkIcon onClick = { () => router.push('/component/profile/saved')} className = 'iconActive' />
                            ) : (
                                <BookmarkIcon onClick = { () => router.push('/component/profile/saved')} className = 'iconInactive' />
                            )
                        }
                        {
                            tagged ? (
                                <UserGroupIcon onClick = { () => router.push('/component/profile/tagged')} className = 'iconActive' />
                            ) : (
                                <UserGroupIcon onClick = { () => router.push('/component/profile/tagged')} className = 'iconInactive' />
                            )
                        }
                    </div>
                    <div className = 'hidden md:flex justify-evenly items-center w-full'>
                        <div className = 'containerDesktop' onClick = { () => router.push(`/component/profile/${user?.uid}/`)}>
                                {postLine ? (
                                    <>
                                        <TableIcon className = 'iconDesktopActive' />
                                        <span className = 'text-sm uppercase'> posts </span>
                                        <span className = 'absolute -top-5 h-[1px]  w-full bg-black'></span>
                                    </>
                                ) : (
                                    <>
                                        <TableIcon className = 'iconDesktop' />
                                        <span className = 'text-sm uppercase text-gray-500'> posts </span>
                                    </>
                                )}
                        </div>
                        <div className = 'containerDesktop' onClick = { () => router.push('/component/profile/saved')}>
                           {postSaved ? (
                               <>
                                    <BookmarkIcon className = 'iconDesktopActive' />
                                    <span className = 'text-sm uppercase'> saved </span>
                                    <span className = 'absolute -top-5 h-[1px] w-full bg-black'></span>
                               </>
                           ) : (
                               <>
                                    <BookmarkIcon className = 'iconDesktop' />
                                    <span className = 'text-sm uppercase text-gray-500'> saved </span>
                                </>
                           )}
                        </div>
                        <div className = 'containerDesktop' onClick = { () => router.push('/component/profile/tagged')}>
                           {tagged ? (
                               <>
                                    <BookmarkIcon className = 'iconDesktopActive' />
                                    <span className = 'text-sm uppercase'> saved </span>
                                    <span className = 'absolute -top-5 h-[1px] w-full bg-black'></span>
                               </>
                           ) : (
                               <>
                                    <BookmarkIcon className = 'iconDesktop' />
                                    <span className = 'text-sm uppercase text-gray-500'> tagged </span>
                                </>
                           )}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ProfileStats

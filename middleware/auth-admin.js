export default async function ({ $auth, store, redirect }) {

  let user = $auth.$state.user;
  // If the user is not authenticated
  debugger
  if (user && user.is_superuser) {
    
  } else {
    return redirect('/login')
  }
}
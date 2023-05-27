import Navbar from './MainLayout.jsx/Navbar';
import Grid4 from './ProfilePageGrid/Grid4';

const CreateBlogPage = () => {
  
  return (
    <div>
    <div className="sticky top-0 z-50">
    <Navbar/>
    </div>
    <div className="flex justify-center">
        <div className="w-2/4 justify-center text">
            <Grid4/>
        </div>
    </div>
    </div>
  );
};

export default CreateBlogPage;
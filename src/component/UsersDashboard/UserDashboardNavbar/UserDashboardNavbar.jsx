const UserDashboardNavbar = () => {
    return (
        <div className='flex justify-end items-center w-full h-16 '>
            <div className='fixed top-0 w-full left-[calc(100%-140px)] '>
                <img
                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
                    className='h-[50px] mb-2 my-2'  // 'mb-2' for bottom margin if needed
                    alt="Logo"
                />
            </div>
        </div>
    );
}

export default UserDashboardNavbar;

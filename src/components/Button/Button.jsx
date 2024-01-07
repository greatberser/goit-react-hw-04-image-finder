export const Button = ({loadMore}) => {
    return(
        <button className="button" onClick={loadMore}>
            Load more
        </button>
    );
};

export default Button;
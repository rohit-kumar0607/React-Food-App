import Error from "./Error.jsx";
import useHttp from "./hooks/useHttp.js";
import Mealitem from "./Mealitem.jsx";
const requestconfig = {};
export default function Meals() {
    const { data: loadedmeals
        , isloading
        , error } = useHttp("https://react-food-app-3avz.onrender.com/meals", requestconfig, [])

    if (isloading) {
        return <p className="center">meals fetching...</p>
    }
    if (error) {
        return <Error title="failed to fetch message" message={error} />
    }

    return (<ul id="meals">
        {loadedmeals.map(meal => <Mealitem key={meal.id} meal={meal} />)}

    </ul>)
}
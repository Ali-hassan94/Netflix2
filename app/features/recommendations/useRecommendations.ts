import { movies } from "@/data/movies";
import { useHistoryStore } from "@/store/historyStore";

export function useRecommendations() {
  const { history } = useHistoryStore();

  const watchedMovies = movies.filter(m => history.includes(m.id));
  const genresWatched = watchedMovies.map(m => m.genre);

  return movies.filter(m => genresWatched.includes(m.genre));
}

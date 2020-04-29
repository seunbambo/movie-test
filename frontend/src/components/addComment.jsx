import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";

class AddComment extends Form {
  state = {
    data: {
      title: "",
      genres: "",
      year: "",
      cast: "",
      comment: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genres: Joi.string().required().label("Genre"),
    year: Joi.number().required().min(0).label("Year"),
    cast: Joi.string().required().min(0).label("Cast"),
    comment: Joi.string().required().min(0).label("Comment"),
  };

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genres: movie.genres,
      year: movie.year,
      cast: movie.cast,
      comment: movie.comment,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <h4 className="mt-5">{this.state.data["title"]}</h4>

          <div className="card my-3">
            <div className="card-body">
              <p>
                <strong>Cast: </strong>
                {this.state.data["cast"]}
              </p>
              <p>
                <strong>Genres: </strong>
                {this.state.data["genres"]}
              </p>
              <p>
                <strong>Year: </strong>
                {this.state.data["year"]}
              </p>
            </div>
          </div>

          {this.renderInput("comment", "Comment")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default AddComment;

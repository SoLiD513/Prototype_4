import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SearchMM.css";
require("dotenv").config();

const API_KEY = "";

const MUSIX_API_ROOT = "https://api.musixmatch.com/ws/1.1/";

class SearchMM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: "",
      form: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate:lyrics " + this.state.lyrics);
    console.log("componentDidUpdate:form " + this.state.form);
  }

  handleChange = (e) => {
    this.setState({
      lyrics: e.target.value,
      form: e.target.value,
    });
    // this.change()
  };

  // change = () => {
  //   this.setState({
  //     form: this.state.lyrics.split(" ").join("%20"),
  //   });
  // };

  handleSubmit(e) {
    e.preventDefault();
    const MUSIX_API_URL =
      MUSIX_API_ROOT +
      "track.search?q_lyrics=" +
      this.state.form +
      // changing the &page_size=1 to any other number will add other tracks to the json list
      // changing &page=1 to any other number will add more info to single tracks on the json list
      "&page_size=1&page=1&s_track_rating=desc&apikey=" +
      API_KEY;
    console.log("MusicAPI: " + MUSIX_API_URL);
  }

  render() {
    return (
      <>
        <div>
          &nbsp; You Need At Least 10 Words To Match !!!EXACTLY!!! To Make It
          Work. &nbsp;
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="lyricForm">
            <Form.Label>&nbsp; Enter Lyrics &nbsp;</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lyrics Go Here"
              onChange={(e) =>
                this.setState({
                  lyrics: e.target.value,

                  // below changes the format into what I need still doesn't 
                  // include the last letter unless you press space after
                  form: this.state.lyrics.split(" ").join("%20"),

                  // copies this.state exactly but doesn't render it to 
                  // the MM-API coreectly to get data back
                  // form: e.target.value,
                })
              }
              value={this.state.lyrics}
            ></Form.Control>
            <Button type="submit" value="Submit" disabled={!this.state.lyrics}>
              Submit
            </Button>
          </Form.Group>
        </Form>
        <br />
        <div id="artistLink" />
      </>
    );
  }
}

export default SearchMM;

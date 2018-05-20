import React, { Component } from 'react';

import ReactPlayer from 'react-player';
import {Grid, Row, Col, Panel, Glyphicon, PageHeader, Form, FormGroup, ControlLabel, FormControl, Button, Table} from 'react-bootstrap';

import Webcam from 'react-webcam';
import axios from 'axios';
import {VictoryChart, VictoryLine, VictoryBar, VictoryTheme} from 'victory';

class VideoPlayer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			played: 0,
			loaded: 0,
			duration: 0,
			log: [],
			data: null,
			graph: {red : [], blue: []}
		}
	}

	componentDidMount() {
		setInterval(this.capture,3000);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {		
		if (this.state.playing) {

			// console.log(JSON.stringify(this.state));

			var temp = {};
			temp.duration = this.state.duration;
			temp.played = this.state.played;
			
			temp.emotion = (this.state.data && this.state.data.data[0]) ? this.state.data.data[0].faceAttributes.emotion : null;
			console.log(temp.emotion);

			if (temp.emotion != null)
				this.state.log.push(temp);

			if (this.state.log.length > 10) {
				this.state.log = this.state.log.slice(1);
			}

			if (temp.emotion) {
				var toGraph = {};
				toGraph.duration = temp.duration * temp.played;
				toGraph.val = 1 - temp.emotion.neutral; 
				this.state.graph.red.push(toGraph);

				this.state.graph.blue = [];

				var labels = ["anger", "disgust", "happiness", "sadness", "surprise"];
				for (var i = 0; i < labels.length; ++i) {
					var n = {};
					n.x = labels[i];
					n.y = temp.emotion[labels[i]];
					this.state.graph.blue.push(n);
				}
			}
		}
	}

	capture = () => {
		console.log("CAPTURE IS HERE!!");
		if (this.state.playing) {
			const imageSrc = this.webcam.getScreenshot();

			// console.log(imageSrc);

			var binary = atob(imageSrc.split(',')[1]);
			var array = [];
			for(var i = 0; i < binary.length; i++) {
			    array.push(binary.charCodeAt(i));
			}
			var blob = new Blob([new Uint8Array(array)], {type: 'image/octet-stream'});

			axios({
			  method: 'post',
			  url: 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion',
			  headers: {
			    'Content-Type': 'application/octet-stream',
			    'Ocp-Apim-Subscription-Key': '884ed8c281c447268c3873b29a746794'
			  },
			  data: blob
			})
			.then((response) => {
			  // console.log(response);
			  this.setState({data: response});
			}).catch((error) => {
			  console.log(error);
			})
		}
	};

	onPlay = () => {
	   	console.log('onPlay')
	    this.setState({ playing: true })
 	}

	onPause = () => {
	   	console.log('onPause')
	    this.setState({ playing: false })
 	} 	
    
 	onDuration = (duration) => {
	    console.log('onDuration', duration)
	    this.setState({ duration })
	}

	onSeekMouseDown = e => {
		this.setState({ seeking: true })
	}
	
	onSeekChange = e => {
		this.setState({ played: parseFloat(e.target.value) })
	}

	onSeekMouseUp = e => {
		this.setState({ seeking: false })
		this.player.seekTo(parseFloat(e.target.value))
	}	

	onProgress = state => {
		console.log('onProgress', state)
		// We only want to update time slider if we are not currently seeking
		if (!this.state.seeking) {
		  this.setState(state)
		}
	}

	ref = player => {
		this.player = player
	}

	setRef = (webcam) => {
		this.webcam = webcam;
	}

	render() {

		const {played, playing, loaded, duration, log} = this.state;

		return (
			<Grid>
				<Row>	
					<Form horizontal>
					    <Col sm={10}>
					      <FormControl type="email" placeholder="Type URL for training video here." />
					    </Col>
					    <Col sm={2}>
					    	<Button bsStyle="default"><Glyphicon glyph="ok" />&nbsp;Test</Button>
					    </Col>
					</Form>

				</Row>

				<hr/>

				<Row>
					<Col md={8}>
						<Row>
						<ReactPlayer
							ref={this.ref}
							width='100%'
				            height='350px'
				            url='https://www.youtube.com/watch?v=vdbg6nJaoEU'
				            playing={this.state.playing}
				            onPlay={this.onPlay}
				            onPause={this.onPause}
				            onDuration={this.onDuration}
				            onSeek={e => console.log('onSeek', e)}
				            onProgress={this.onProgress}
						/>
						</Row>

						<Row>
						    {this.player && 
							<Table>
								<tbody>
								<tr>
								  <th>Seek</th>
					              <td>
					                <input
					                  type='range' min={0} max={1} step='any'
					                  value={played}
					                  onMouseDown={this.onSeekMouseDown}
					                  onChange={this.onSeekChange}
					                  onMouseUp={this.onSeekMouseUp}
					                />
					              </td>
				              	</tr>
				              	</tbody>
							</Table>}
						</Row>
					</Col>

					<Col md={4}>
						<Panel bsStyle="primary" defaultExpanded>
				          <Panel.Heading>
				            <Panel.Title toggle>
				              <Glyphicon glyph="eye-open" /> &nbsp;
				              Watch your expressions! 
				            </Panel.Title>
				          </Panel.Heading>
				          <Panel.Collapse>
				            <Panel.Body>
					         	<Webcam
						            audio={false}
						            height='100%'
						            screenshotFormat="image/jpeg"
						            ref={this.setRef}
						            width='100%'
						         />
				            </Panel.Body>
				          </Panel.Collapse>
				        </Panel>
					</Col>
				</Row>

				<br/><br/>

				<Row>
					<Col md={6}>
						<h4>Interest Level</h4>
						<VictoryChart>
						    <VictoryLine
						      style={{data:
						        {stroke: "#EF3340", strokeWidth: 4}
						      }}
						      data={this.state.graph && this.state.graph.red}
						      x='duration'
						      y='val'
						    />
						  </VictoryChart>
					</Col>

					<Col md={6}>
						<h4>Emotion Feedback</h4>
						<VictoryChart
						  theme={VictoryTheme.material}
						>
						  <VictoryBar
						    style={{ data: { fill: "#191970", width: 25 } }}
						    alignment="start"
						    data={this.state.graph && this.state.graph.blue}
						  />
						</VictoryChart>
					</Col>
				</Row>

				<hr/>
				<br/>

				<Row>
						<Table responsive hover>
							<thead>
							    <tr>
							      <th>Duration</th>
							      <th>Played</th>
							      <th>Anger</th>
							      <th>Contempt</th>
							      <th>Disgust</th>
							      <th>Happiness</th>
							      <th>Neutral</th>
							      <th>Sadness</th>
							      <th>Surprise</th>
							    </tr>
							 </thead>
							 <tbody>
							 	{log.map((data) => 
							 		<tr>
							 			<td>{data.duration}</td>
							 			<td>{data.played}</td>


							 			<td>{data.emotion && data.emotion.anger}</td>
							 			<td>{data.emotion && data.emotion.contempt}</td>
							 			<td>{data.emotion &&data.emotion.disgust}</td>
							 			<td>{data.emotion &&data.emotion.happiness}</td>
							 			<td>{data.emotion &&data.emotion.neutral}</td>
							 			<td>{data.emotion &&data.emotion.sadness}</td>
							 			<td>{data.emotion &&data.emotion.surprise}</td>

							 		</tr>)}
							 </tbody>
						</Table>				
				</Row>

			</Grid>
		)
	}

}

export default VideoPlayer;
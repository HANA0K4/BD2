import React, { useState, useEffect } from 'react';
import auth from './../auth/auth-helper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { create } from './api-post.js';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#E3E9F0',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    boxShadow: 'none'
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2),
    backgroundColor: '#337AB7',
    color: '#FFFFFF'
  },
  filename: {
    verticalAlign: 'super'
  },
  error: {
    verticalAlign: 'middle'
  }
}));

export default function NewPost(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    text: '',
    photo: '',
    error: '',
    user: {}
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setValues({ ...values, user: auth.isAuthenticated().user });
  }, []);

  const clickPost = () => {
    let postData = new FormData();
    postData.append('text', values.text);
    postData.append('photo', values.photo);
    create({ userId: jwt.user._id }, { t: jwt.token }, postData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, text: '', photo: '' });
          props.addUpdate(data);
        }
      }
    );
  };

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoURL = values.user._id
    ? '/api/users/photo/' + values.user._id
    : '/api/users/defaultphoto';

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={photoURL} />}
          title={values.user.name}
          className={classes.cardHeader}
          style={{ backgroundColor: '#337AB7', color: '#FFFFFF' }}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Comentario"
            multiline
            rows="3"
            value={values.text}
            onChange={handleChange('text')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <input
            accept="image/*"
            onChange={handleChange('photo')}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              className={classes.photoButton}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>{' '}
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ''}
          </span>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={values.text === ''}
            onClick={clickPost}
            className={classes.submit}
          >
            PUBLICAR
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired
};

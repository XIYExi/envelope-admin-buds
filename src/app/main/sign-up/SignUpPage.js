import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Box,
  Paper,
  ListItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '../../../@lodash';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';
import CommitImage from '../sign-in/images/commit-suggestions.png';
import ConfigurationImage from '../sign-in/images/configuration-files.png';
import DarkModeImage from '../sign-in/images/dark-mode.png';
import ReleaseImage from '../sign-in/images/first-release.png';
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";



/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  displayName: yup.string().required('You must enter display name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ displayName, password, email }) {
    jwtService
      .createUser({
        displayName,
        password,
        email,
      })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="w-[100%] lg:w-[45%] relative flex overflow-hidden sm:fixed sm:inset-0 sm:z-9999 sm:flex h-full items-center justify-center
       py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Display name"
                  autoFocus
                  type="name"
                  error={!!errors.displayName}
                  helperText={errors?.displayName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>

      <div className='absolute right-0 top-0 z-9999 hidden md:flex sm:w-[40%] md:w-[55%]'>
        <Box className="hidden lg:flex flex-auto items-center justify-center h-full p-64 lg:px-112 w-full">
          <div className="right-0 top-0 z-9999 overflow-auto absolute z-10 relative w-full max-w-[600px]">

            <section className='mt-[80px]'>
              <img
                  src={CommitImage}
                  loading={'lazy'}
                  className='rounded-[20px]'
                  alt={''}
              />

              <Typography component={'h2'} className='mt-[32px] font-[500]'>
                Commit messgae suggestions
              </Typography>

              <Typography className='mt-[32px] font-thin'>
                In the latest release, I've added support for commit message and description suggestions via an integration with OpenAI.
                Commit looks at all of your changes, and feeds that into the machine with a bit of prompt-tuning to get back a commit
                message that does a surprisingly good job at describing the intent of your changes.
              </Typography>

              <Typography className='mt-[32px] font-thin'>
                It's also been a pretty helpful way to remind myself what the hell I was working on at the end of the
                day yesterday when I get back to my computer and realize I didn't commit any of my work.
              </Typography>

              <div className='flex mt-[32px]'>
                <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                <Typography component={'h3'} className='font-[500]'>Improvements</Typography>
              </div>

              <div className='mt-[32px]'>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Added commit message and description suggestions powered by OpenAI
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Fixed race condition that could sometimes leave you in a broken rebase state
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Improved active project detection to try and ignore file changes triggered by the system instead of the user
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Fixed bug that sometimes reported the wrong number of changed files
                </ListItem>
              </div>
            </section>

            <section className='mt-[64px]'>
              <img
                  src={ConfigurationImage}
                  loading={'lazy'}
                  className='rounded-[20px]'
                  alt={''}
              />

              <Typography component='h2' className='mt-[32px] font-[500]'>
                Project configuration files
              </Typography>

              <Typography className='font-thin mt-[32px]'>
                I've added support for creating per-project .commitrc files that override your global settings for that particular project. Went with YAML for these because personally I'm sick of quoting keys in JSON all the time, or accidentally leaving in a trailing comma.
              </Typography>

              <div className='flex mt-[32px]'>
                <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                <Typography component='h3' className='font-[500]'>Improvements</Typography>
              </div>

              <div className='mt-[32px]'>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Added per-project .commitrc configuration files
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Improved performance when working with projects with large binary files
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Fixed a bug that could cause Commit to crash when autocommitting after deleting a recently active branch
                </ListItem>
              </div>
            </section>

            <section className='mt-[64px]'>
              <img
                  src={DarkModeImage}
                  loading={'lazy'}
                  className='rounded-[20px]'
                  alt={''}
              />

              <Typography component={'h2'} className='mt-[32px] font-[500]'>
                Dark mode support
              </Typography>

              <Typography className='font-thin mt-[32px]'>
                I released this thing last week hoping a couple of people would say "awesome job" and make me feel good about what I'd built but instead I just got a ton of people shaming me on Twitter for being such a horrible person for only shipping a light UI.
              </Typography>

              <div className='flex mt-[32px]'>
                <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                <Typography component={'h3'} className='font-[500]'>Improvements</Typography>
              </div>

              <div className='mt-[32px]'>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Added dark mode support
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Improved input field responsiveness when writing a commit message in a project with a large number of changed files
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  <EnvelopeSvgIcon className='mr-[10px]'>heroicons-outline:adjustments</EnvelopeSvgIcon>
                  Made keyboard shortcut for opening the Commit window customizable
                </ListItem>
                <ListItem autoFocus className='font-thin'>
                  Deleted my Twitter account
                </ListItem>
              </div>
            </section>

            <section className='mt-[64px]'>
              <img
                  src={ReleaseImage}
                  loading={'lazy'}
                  className='rounded-[20px]'
                  alt={''}
              />

              <Typography component={'h2'} className='mt-[32px] font-[500]'>
                Commit v0.1.0
              </Typography>

              <Typography className='mt-[32px] font-thin'>
                Commit is a command palette-style Git client you can pull up from anywhere with a keyboard shortcut that makes it really easy to commit your work. It uses the "last modified" timestamp of the files in all of your projects to automatically know which project you're in the middle of working on, so any time you pull up the UI it's already got the right project selected — you just have to type your commit message, hit Cmd + Enter and your changes are captured.
              </Typography>


              <Typography className='mt-[32px] font-thin'>
                I'd be lying if I really thought this was that useful but I was looking for an excuse to learn macOS development and here we are. It's open source at least so maybe you can find something interesting in the code even if the app itself is a total waste of hard drive space.
              </Typography>
            </section>

          </div>
        </Box>
      </div>
    </div>
  );
}

export default SignUpPage;

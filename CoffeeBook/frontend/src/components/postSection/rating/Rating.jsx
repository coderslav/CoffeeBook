import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
   const [value, setValue] = React.useState(4);

   return (
      <Box sx={{'& > legend': { mt: 2 }}}>
         <div className='d-flex justify-content-end mt-2'>
            <div className='me-2'>
               <Typography component="legend">Note : 4</Typography>
            </div>
            <div>
               <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                     setValue(newValue);
                  }}
               />
            </div>
         </div>
      </Box>
   );
}

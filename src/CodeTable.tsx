import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CodeTable = ({ codes }: { codes: Record<string, Array<string>> }) => {
  const keys = Object.keys(codes);
  const [code, setCode] = useState(() => {
    const lastKey = keys[keys.length - 1];
    return lastKey;
  });

  const handleChange = (event: SelectChangeEvent) => {
    setCode(event.target.value as string);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Fecha de escaneo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={code}
                  label="Fecha de lectura"
                  onChange={handleChange}
                >
                  {keys.map((key, index) => (
                    <MenuItem key={`${key}${index}`} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        {code ? (
          <TableBody>
            {codes[code].map((row) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default CodeTable;

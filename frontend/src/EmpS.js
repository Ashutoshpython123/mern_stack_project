import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function EmpS({ x }) {

    return (

        <TableBody>

            <TableRow >
                <TableCell component="th" scope="row">
                    {x.name}
                </TableCell>
                <TableCell align="right">{x.phone_number}</TableCell>
                <TableCell align="right">{x.organization}</TableCell>
                <TableCell align="right">{x.date}</TableCell>
                <TableCell align="right">{x.rating}</TableCell>
            </TableRow>
        </TableBody>

    );
}
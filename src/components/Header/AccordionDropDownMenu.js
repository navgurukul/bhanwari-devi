import {
  Typography,
  Menu,
  MenuItem,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

// TODO: Make it conform to this signature, adding properties as necessary
/**
 * Component for representing a mobile dropdown AccordionDropDown menu.
 * @param {string} textMsgKey the constant key for the text to display on the menu item toggling
 *   the dropdown
 * @param {Array.<ReactElement>=} textArgs an optional arguments Array to supply to
 *   the Message component
 * @param {Array.<MenuItem>} options the Array of options in the dropdown menu
 */
export default function AccordionDropDownMenu({
  // textMsgKey,
  // textArgs,
  // options,
  children,
}) {
  return (
    <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ width: 380 }}
      >
        <Typography variant="subtitle1">
          <Message constantKey={textMsgKey} args={btnTextArgs} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
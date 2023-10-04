import React from "react";

const DashboardTable = ({ data, region, tableDistrict }) => {
  return (
    <div className="State-dashboard-container">
      <table className="volunteer-class-table">
        <thead>
          <tr>
            <th>Group Name</th>
            {region === "all" && <th>Number of Districts</th>}
            <th>Number of ITIs</th>
            <th>Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => tableDistrict(item.partner_group_name)}
            >
              <td data-column="Group Name">{item.partner_group_name}</td>
              {region === "all" && (
                <td data-column="Group Name">
                  {item.partner_groups_data.total_no_of_groups}
                </td>
              )}
              <td data-column="No Partners">
                {item.partner_groups_data.total_no_of_partners}
              </td>
              <td data-column="No Students">
                {item.partner_groups_data.total_no_of_students}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;

<?=$this->Html->css('gapsAdd')?>

<!-- CENTRAL JUMBOTRON -->
<?=$this->Form->create($gap, array('onsubmit' => "return setArray(" . $poll_id . ");"));?>
<script>var rows=[];</script>
    <div class="jumbotron jumbotron-fluid rounded">
        <div class="container">
            <h1 class="display-4">
<?=__("Create poll")?>            </h1>
            <p class="lead">
<?=__("Now, tell us the possible dates")?>            </p>
            
            <div class="table-responsive">
                <table class="table text-center" id="gapsTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                <?=__("Day")?>
                            </th>
                            <th scope="col">
<?=__("Start hour")?>                            </th>
                            <th scope="col">
                            <?=__("End hour")?>                            </th>
                            <th scope="col">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input class="form-control floating-label text-center date" id="date0" placeholder="<?=__("Date")?>" type="text" required>
                            </td>
                            <td>
                                <input class="form-control floating-label text-center startTime" id="startTime0" placeholder="<?=__("Start hour")?>" type="text" required>
                            </td>
                            <td>
                                <input class="form-control floating-label text-center endTime" id="endTime0" placeholder="<?=__("End hour")?>" type="text" required>
                            </td>
                            <script> rows.push(0);</script>
                        </tr>
                    </tbody>
                </table>
                <hr class="my-3">
                <div class="other-option-button">
                    <button class="btn btn-outline-success" onClick="addRow()" type="button">
<?=__("Add other option")?>                    </button>
                </div>
            </div>

            <div class="col-sm-10 accept-button">
                <?= $this->Form->button(__('End'), ["class"=>"btn btn-outline-secondary"]) ?>
            </div>
            
        </div>
    </div> 
<div id="inputs"></div>

<?=$this->Form->end()?>

<?=$this->Html->script('gaps');?>
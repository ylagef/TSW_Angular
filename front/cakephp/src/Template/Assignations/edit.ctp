<?=$this->
Html->css('assignationEdit')?>
<?=$this->
Html->script('scripts')?>
<!-- CENTRAL JUMBOTRON -->
<?=$this->Form->create()?>
<script>
function loadValuesCheckboxes(gap_id, user_id){
    document.getElementById("G"+gap_id+"."+user_id).checked = true;
    document.getElementById("U"+gap_id+"."+user_id).checked = true;
}
</script>
<div class="jumbotron jumbotron-fluid rounded">
    <div class="container">
        <h1 class="display-4">
        <?=__("Edit participation")?>        </h1>
        <p class="lead">
            <i class="material-icons lead-icon">
                keyboard_arrow_right
            </i>
            <?=h($poll->
            title)?>
        </p>
        <p class="lead"><?php
          if($poll->place!=null){
            echo "<i class='material-icons lead-icon'>place</i> ";
            echo h($poll->place);
          } else {
            echo __("Location not specified");
          } 
        ?>
      </p>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text link-icon">
                    <i class="material-icons ">
                        link
                    </i>
                </span>
            </div>
            <input type="text" class="form-control poll-link" value="<?=$_SERVER["HTTP_HOST"]?>/polls/view/<?= h($poll->url) ?>" disabled id="copyValue">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="copy()"><?=__("COPY")?></button>
                </div>
            </input>
        </div>
        <?php 
            $input=0;
            foreach ($gaps as $gap): ?>
                <input type="checkbox" id="G<?=h($gap->gap_id)?>.<?=$this->request->getSession()->read('Auth.User.user_id')?>" name="<?=$input?>[gap_id]" value="<?=h($gap->gap_id)?>" hidden>
                <input type="checkbox" id="U<?=h($gap->gap_id)?>.<?=$this->request->getSession()->read('Auth.User.user_id')?>"name="<?=$input?>[user_id]" value="<?=$this->request->getSession()->read('Auth.User.user_id')?>" hidden>
        <?php $input++; endforeach;?>
        <div class="table-responsive">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">
                        </th>
                        <?php foreach ($users as $user): ?>
                            <th scope="col">
                                <?=h($user->
                                name)?>
                            </th>
                        <?php endforeach;?>
                        <th scope="col">
                            <?=$this->
                            request->getSession()->read('Auth.User.name')?>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($gaps as $gap): ?>
                        <tr>
                            <th scope="row">
                                <p>
                                <?=h($gap->
                                start_date)?>
                                </p>
                                <p>
                                    <?=h($gap->
                                    end_date)?>
                                </p>
                            </th>
                            <?php foreach ($users as $user):
                                $isAssigned = false;
                                ?>
                                <td>
                                    <?php foreach ($assignations as $assign):
                                        if ($assign['user_id'] == $user->
                                                            user_id && $assign['gap_id'] == $gap->gap_id) {
                                            $isAssigned = true;
                                        }
                                    endforeach;

                                    if ($isAssigned) {
                                        ?>

                                    <button class="btn btn-success btn-sm" disabled="" type="button">
                                    <?php
                                    } else {
                                    ?>
                                        <button class="btn btn-outline-success btn-sm" disabled="" type="button">
                                    <?php
                                    }
                                    ?>
                                    <i class="material-icons">
                                        done
                                    </i>
                                        </button>
                                    </button>
                                </td>
                            <?php endforeach;?>
                            <td>
                            <?php $userAssigned=false;
                                    foreach ($assignations as $assign):    
                                        if ($assign['user_id'] == $this->request->getSession()->read('Auth.User.user_id')
                                                && $assign['gap_id'] == $gap->gap_id) {
                                                    $userAssigned=true;
                                                    echo "<script type='text/javascript'> loadValuesCheckboxes(";
                                                     echo $gap->gap_id;
                                                     echo ",";
                                                     echo $this->request->getSession()->read('Auth.User.user_id');
                                                     echo "); </script>";
                                            }
                                    endforeach;
                                    if($userAssigned){
                                            ?>
                                <button class="btn btn-success btn-sm" onclick="toggle.call(this, <?=$this->request->getSession()->read('Auth.User.user_id')?>, <?=h($gap->gap_id)?>)" type="button">
                                    <i class="material-icons">
                                        done
                                    </i>
                                </button>
                                                <?php } else { ?>
                                <button class="btn btn-outline-success btn-sm" onclick="toggle.call(this, <?=$this->request->getSession()->read('Auth.User.user_id')?>, <?=h($gap->gap_id)?>)" type="button">
                                    <i class="material-icons">
                                        done
                                    </i>
                                </button>
                                                <?php } ?>
                            </td>
                        </tr>
                    <?php endforeach;?>
                </tbody>
            </table>
            
            <hr class="my-3">

            
            
        </div>
    </div>
    <div class="col-sm-10 accept-button">
                <?=$this->
                Form->button(__('Edit'), ["class" => "btn btn-outline-secondary"]);?>
            </div>
</div>
<?=$this->Form->end()?>

<script>
    function toggle(user_id, gap_id) {
        if ($(this)[0].classList.contains('btn-outline-success')) {
            $(this).removeClass("btn-outline-success");
            $(this).addClass("btn-success");
            
            document.getElementById("G"+gap_id+"."+user_id).checked = true;
            document.getElementById("U"+gap_id+"."+user_id).checked = true;
        } else {
            $(this).addClass("btn-outline-success");
            $(this).removeClass("btn-success");

            document.getElementById("G"+gap_id+"."+user_id).checked = false;
            document.getElementById("U"+gap_id+"."+user_id).checked = false;
        }
    }
</script>